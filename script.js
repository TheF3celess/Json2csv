document.addEventListener("DOMContentLoaded", () => {
  const jsonInput = document.getElementById("jsonInput")
  const csvOutput = document.getElementById("csvOutput")
  const convertBtn = document.getElementById("convertBtn")
  const downloadBtn = document.getElementById("downloadBtn")
  const message = document.getElementById("message")

  convertBtn.addEventListener("click", convertJsonToCsv)
  downloadBtn.addEventListener("click", downloadCsv)

  function convertJsonToCsv() {
    const json = jsonInput.value.trim()
    message.textContent = ""
    message.className = "message"

    try {
      const jsonData = JSON.parse(json)

      if (!Array.isArray(jsonData)) {
        throw new Error("Input must be an array of objects")
      }

      const headers = Object.keys(jsonData[0])
      const csvRows = [
        headers.join(","),
        ...jsonData.map((row) => headers.map((fieldName) => JSON.stringify(row[fieldName] ?? "")).join(",")),
      ]

      const csvString = csvRows.join("\n")
      csvOutput.value = csvString
      downloadBtn.disabled = false

      message.textContent = "JSON successfully converted to CSV!"
      message.classList.add("success")
    } catch (error) {
      csvOutput.value = ""
      downloadBtn.disabled = true
      message.textContent = `Error: ${error.message}`
      message.classList.add("error")
    }
  }

  function downloadCsv() {
    const blob = new Blob([csvOutput.value], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "converted.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
})

