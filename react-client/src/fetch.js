const URL = "http://localhost:8000"

export const fetchAnovaResult = async ({ groups, repeated = false }) => {
  try {
    const res = await fetch(`${URL}/stat/multigroup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify({ groups, repeated }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch anova");

    return data
  } catch (error) {
    throw error
  }
};

export const fetchTtestResult = async ({ group1, group2, paired = false }) => {
  try {
    const res = await fetch(`${URL}/stat/twogroup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify({ group1, group2, paired }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch ttest");

    return data
  } catch (error) {
    throw error
  }
};



export const fetchSignup = async ({ email, password, name }) => {
  try {
    const res = await fetch(`${URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
      credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to sign up");
  }
};

export const fetchLogin = async ({ email, password }) => {
  try {
    const res = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include"
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to log in");
  }
};


export const fetchVerifyEmail = async ({ token }) => {
  try {
    const res = await fetch(`${URL}/auth/verify-email`, {
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.detail || 'Verification failed');
    }

    return data
  } catch (error) {
    throw new Error(error.message || 'Failed to verify email');
  }
};

export const fetchRequestPasswordReset = async ({ email }) => {
  const res = await fetch(`${URL}/auth/request-password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || 'Failed to request password reset');
  }
  return data
};

export const fetchResetPassword = async ({ token, newPassword }) => {
  try {
    const res = await fetch(`${URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.detail || data.message || 'Failed to reset password');
    }
    return data
  } catch (error) {
    throw new Error(error.message || 'Failed to reset password');
  }
};


export const fetchPrediction = async (data) => {
  try {
    const res = await fetch(`${URL}/ml/prediction`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Baca body sekali aja sebagai text…
    const text = await res.text();

    // …lalu coba parse JSON—jika gagal, biarkan jadi string
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }

    if (!res.ok) {
      // Kalau status bukan 2xx, lempar isi body sebagai error
      console.error('🔴 server validation errors:', payload);
      throw payload;
    }

    // Status 2xx: return hasil parsed
    return payload;
  } catch (err) {
    // Tangani error validasi Pydantic atau error lain
    const details = err.errors || err.detail || err;
    if (Array.isArray(details)) {
      console.error('Validation errors:', JSON.stringify(details, null, 2));
    } else {
      console.error('Unknown error:', details);
    }
    // Kamu bisa re‑throw kalau mau ditangani lagi di hook
    throw err;
  }
};



const payload = {
  age: 63,
  sex: "male",                       // ["male","female"]
  chestPainType: "typical angina",   // ["typical angina","atypical angina","non-anginal pain","asymptomatic"]
  restingBloodPressure: 145,
  cholesterol: 233,
  fastingBloodSugar: "<=120mg/dl",   // ["<=120mg/dl",">120mg/dl"]
  restingEcg: "normal",              // ["normal","ST-T wave abnormality","left ventricular hypertrophy"]
  maxHeartRate: 150,
  exerciseInducedAngina: "no",       // ["no","yes"]
  stDepression: 2.3,
  stSlope: "upsloping",              // ["upsloping","flat","downsloping"]
  numMajorVessels: 0,
  thalassemia: "normal"              // ["normal","fixed defect","reversible defect"]
};
