import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reporte = () => {
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos desde la API
  useEffect(() => {
    fetch("https://laughing-acorn-jj49r6q4974q2g9w-5000.app.github.dev/reportes")
      .then((res) => res.json())
      .then((data) => setReportes(data))
      .catch((err) => console.error("Error al cargar reportes:", err))
      .finally(() => setCargando(false));
  }, []);

  // Función para generar PDF
  const generarPDF = () => {
    if (reportes.length === 0) {
      alert("Aún no hay datos para generar el PDF");
      return;
    }

    const doc = new jsPDF();

    // Fecha del reporte
    const fecha = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Fecha: ${fecha}`, 14, 10);

    // Título centrado
    doc.setFontSize(18);
    doc.setTextColor(72, 36, 155); // morado oscuro
    doc.text("Reporte de Proyectos", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

    // Tabla
    const headers = [["ID", "Nombre", "Resultado"]];
    const rows = reportes.map((r) => [r.id, r.nombre, r.resultado]);

    autoTable(doc, {
      head: headers,
      body: rows,
      startY: 30,
      styles: { halign: "center" },
      headStyles: { fillColor: [124, 58, 237], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 245, 255] },
      didDrawPage: (data) => {
        // Número de página
        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Página ${data.pageNumber} / ${pageCount}`, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10, { align: "right" });
      },
    });

    // Descargar PDF
    doc.save("reporte_proyectos.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-200 p-8">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-10 drop-shadow-sm">
          📊 Reporte de Proyectos
        </h1>

        {cargando ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando datos...</p>
          </div>
        ) : (
          <>
            {reportes.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border border-purple-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-purple-600 text-white text-lg">
                      <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Nombre</th>
                        <th className="py-3 px-6 text-left">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportes.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`${index % 2 === 0 ? "bg-purple-50" : "bg-white"} hover:bg-purple-100 transition-all duration-200`}
                        >
                          <td className="py-3 px-6 text-gray-700 font-medium">{item.id}</td>
                          <td className="py-3 px-6 text-gray-700">{item.nombre}</td>
                          <td className="py-3 px-6 text-gray-700">{item.resultado}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={generarPDF}
                    disabled={reportes.length === 0}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    📄 Generar PDF
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600 text-lg mt-4">No hay datos para mostrar.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reporte;
