import { useEffect, useState } from 'react'

export default function ReportTable() {
  const [reportes, setReportes] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/reportes')
      .then(res => res.json())
      .then(data => setReportes(data))
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reportes</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map(r => (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-2">{r.id}</td>
              <td className="px-4 py-2">{r.nombre}</td>
              <td className="px-4 py-2">{r.resultado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
