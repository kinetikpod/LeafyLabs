


```js
// sebelum upload file csv:
uploads = []

// sebelum menerima data dari backend atau setelah upload ile csv
uploads = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",  // crypto.randomUUID()
    headers: ["Group","A","B","C"],
    rows: [
      { Group: "G1", A: "5.2", B: "6.1", C: "7.3" },
      { Group: "G2", A: "4.8", B: "5.9", C: "6.7" },
      { Group: "G1", A: "5.5", B: "6.3", C: "7.0" },
      { Group: "G2", A: "4.9", B: "6.0", C: "6.8" },
      { Group: "G1", A: "5.1", B: "6.2", C: "7.1" },
    ],
    violinTraces: [
      { type: "violin", y: [5.2,4.8,5.5,4.9,5.1], name: "A", box:{…}, meanline:{…} },
      { type: "violin", y: [6.1,5.9,6.3,6.0,6.2], name: "B", box:{…}, meanline:{…} },
      { type: "violin", y: [7.3,6.7,7.0,6.8,7.1], name: "C", box:{…}, meanline:{…} },
    ],
    result: null
  }
]

// backend mengembalikan:
{
  "f_stat": 4.35,
  "p_value": 0.021,
  "conclusion": "Reject null hypothesis",
  "test_type": "One-way ANOVA"
}


// dengan mekanisme:
onSuccess: ({ uploadId, result }) => {
  setUploads(prev =>
    prev.map(u =>
      u.id === uploadId
        ? { ...u, result }
        : u
    )
  )
}


// maka uploads menjadi:
uploads = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    headers: ["Group","A","B","C"],
    rows: [ /* sama seperti di atas */ ],
    violinTraces: [ /* sama seperti di atas */ ],
    result: {
      f_stat: 4.35,
      p_value: 0.021,
      conclusion: "Reject null hypothesis",
      test_type: "One-way ANOVA"
    }
  }
]

