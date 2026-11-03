/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Comprehensive Reports & Analytics View for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  Calendar, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  Users, 
  RefreshCw,
  Search
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { exportReportToPDF, exportPQRSToExcel } from '../utils/exportUtils';
import { SolicitudPQRS } from '../types';

export const ReportsView: React.FC = () => {
  const { pqrs, encuestas, users, metrics } = useCRM();

  const [selectedReportType, setSelectedReportType] = useState<string>('general');
  const [dateRange, setDateRange] = useState<string>('anio');
  const [generatedTimestamp, setGeneratedTimestamp] = useState<string>(new Date().toISOString().substring(0, 19).replace('T', ' '));
  const [reportHistory, setReportHistory] = useState<Array<{ id: string; name: string; date: string; rows: number }>>([
    { id: 'h-1', name: 'Informe General de PQRS - Vigencia 2026', date: '2026-02-28 17:00', rows: 150 },
    { id: 'h-2', name: 'Informe de Quejas y Reclamos Febrero', date: '2026-02-28 16:30', rows: 18 }
  ]);

  const todayStr = new Date().toISOString().substring(0, 10);

  const reportDefinitions: Record<string, {
    title: string;
    subtitle: string;
    filterFn: (ticket: SolicitudPQRS) => boolean;
  }> = {
    'general': {
      title: 'INFORME GENERAL DE PQRS',
      subtitle: 'Consolidado total de solicitudes radicadas, gestionadas y cerradas',
      filterFn: () => true
    },
    'peticiones': {
      title: 'INFORME DE PETICIONES',
      subtitle: 'Requerimientos de interés general y particular recibidos por la Corporación',
      filterFn: t => t.tipo === 'Petición'
    },
    'quejas_reclamos': {
      title: 'INFORME DE QUEJAS Y RECLAMOS',
      subtitle: 'Inconformidades con el servicio, conductas o entregas para análisis de causa raíz',
      filterFn: t => t.tipo === 'Queja' || t.tipo === 'Reclamo'
    },
    'sugerencias_felicitaciones': {
      title: 'INFORME DE SUGERENCIAS Y FELICITACIONES',
      subtitle: 'Reconocimientos y propuestas de mejora comunitaria para el ciclo PHVA',
      filterFn: t => t.tipo === 'Sugerencia' || t.tipo === 'Felicitación'
    },
    'pendientes': {
      title: 'INFORME DE SOLICITUDES PENDIENTES',
      subtitle: 'Casos actualmente en trámite, asignación o en espera de documentación',
      filterFn: t => t.estado !== 'Solucionada y cerrada'
    },
    'vencidas': {
      title: 'INFORME DE SOLICITUDES VENCIDAS',
      subtitle: 'Casos que excedieron los términos legales de respuesta (Ley 1755 de 2015)',
      filterFn: t => t.estado !== 'Solucionada y cerrada' && t.fechaLimite < todayStr
    },
    'solucionadas': {
      title: 'INFORME DE SOLICITUDES SOLUCIONADAS',
      subtitle: 'Casos cerrados formalmente con respuesta emitida a satisfacción',
      filterFn: t => t.estado === 'Solucionada y cerrada'
    },
    'tiempos_respuesta': {
      title: 'INFORME DE TIEMPOS DE RESPUESTA Y OPORTUNIDAD',
      subtitle: 'Cómputo de días transcurridos entre radicación y respuesta final',
      filterFn: () => true
    },
    'satisfaccion': {
      title: 'INFORME DE SATISFACCIÓN DEL USUARIO (CSAT)',
      subtitle: 'Resultados de encuestas y percepciones sobre el servicio recibido',
      filterFn: () => true
    },
    'por_colaborador': {
      title: 'INFORME POR COLABORADOR ASIGNADO',
      subtitle: 'Carga operativa, volumen atendido y porcentaje de resolución por funcionario',
      filterFn: () => true
    },
    'por_area': {
      title: 'INFORME POR ÁREA RESPONSABLE',
      subtitle: 'Distribución de solicitudes según dependencias funcionales de la Corporación',
      filterFn: () => true
    },
    'por_canal': {
      title: 'INFORME POR CANAL DE ATENCIÓN',
      subtitle: 'Análisis de afluencia por WhatsApp, Correo, PBX, Web y Presencial',
      filterFn: () => true
    },
    'mensual_anual': {
      title: 'INFORME PERIÓDICO MENSUAL Y ANUAL',
      subtitle: 'Balance ejecutivo consolidado para la Gerencia y Junta Directiva',
      filterFn: () => true
    }
  };

  const currentDef = reportDefinitions[selectedReportType] || reportDefinitions['general'];
  const filteredData = pqrs.filter(currentDef.filterFn);

  const handleGenerateReport = () => {
    const timestamp = new Date().toISOString().substring(0, 19).replace('T', ' ');
    setGeneratedTimestamp(timestamp);
    setReportHistory(prev => [
      {
        id: `h-${Date.now()}`,
        name: currentDef.title,
        date: timestamp,
        rows: filteredData.length
      },
      ...prev.slice(0, 9)
    ]);
  };

  const handleDownloadPDF = () => {
    const summary = [
      { label: 'Total Registros', value: filteredData.length },
      { label: 'Solucionadas', value: filteredData.filter(t => t.estado === 'Solucionada y cerrada').length },
      { label: 'Pendientes', value: filteredData.filter(t => t.estado !== 'Solucionada y cerrada').length },
      { label: 'Cumplimiento Términos', value: `${metrics.tasaCumplimientoTiempos}%` }
    ];

    const columns = ['Radicado', 'Fecha', 'Usuario', 'Tipo', 'Canal', 'Área', 'Responsable', 'Estado'];
    const rows = filteredData.map(t => [
      t.consecutivo,
      t.fechaRecepcion,
      t.userName,
      t.tipo,
      t.canalRecepcion,
      t.areaResponsable,
      t.colaboradorAsignado,
      t.estado
    ]);

    exportReportToPDF(
      currentDef.title,
      currentDef.subtitle,
      summary,
      columns,
      rows,
      `${currentDef.title.replace(/\s+/g, '_')}.pdf`
    );
  };

  const handleDownloadExcel = () => {
    exportPQRSToExcel(filteredData, `${currentDef.title.replace(/\s+/g, '_')}.xlsx`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Informes y Reportes</h2>
          <p className="text-xs text-slate-500">
            Generación y exportación de reportes ejecutivos con membrete oficial de Corporación Social Somos Uno.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateReport}
            className="px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 shadow-2xs transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generar Informe</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-red-600" />
            <span>Descargar PDF</span>
          </button>
          <button
            onClick={handleDownloadExcel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Descargar Excel</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Report Selector Strip */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-full md:w-2/3">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Seleccionar Tipo de Informe (13 Plantillas Oficiales)
            </label>
            <select
              value={selectedReportType}
              onChange={e => setSelectedReportType(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500"
            >
              <option value="general">1. Informe General de PQRS</option>
              <option value="peticiones">2. Informe de Peticiones</option>
              <option value="quejas_reclamos">3. Informe de Quejas y Reclamos</option>
              <option value="sugerencias_felicitaciones">4. Informe de Sugerencias y Felicitaciones</option>
              <option value="pendientes">5. Informe de Solicitudes Pendientes</option>
              <option value="vencidas">6. Informe de Solicitudes Vencidas</option>
              <option value="solucionadas">7. Informe de Solicitudes Solucionadas</option>
              <option value="tiempos_respuesta">8. Informe de Tiempos de Respuesta</option>
              <option value="satisfaccion">9. Informe de Satisfacción del Usuario (CSAT)</option>
              <option value="por_colaborador">10. Informe por Colaborador Asignado</option>
              <option value="por_area">11. Informe por Área Responsable</option>
              <option value="por_canal">12. Informe por Canal de Atención</option>
              <option value="mensual_anual">13. Informe Periódico Mensual y Anual</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Rango de Fechas
            </label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 font-medium text-slate-800 focus:ring-2 focus:ring-blue-500"
            >
              <option value="anio">Todo el Año 2026</option>
              <option value="mes">Mes Actual</option>
              <option value="trimestre">Trimestre Actual (Q1)</option>
              <option value="historico">Histórico Completo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generated Report Preview Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Institutional Document Header Mock */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold text-blue-900 tracking-wider uppercase">
                CORPORACIÓN SOCIAL SOMOS UNO · NIT: 900.876.543-1
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">{currentDef.title}</h3>
              <p className="text-xs text-slate-600">{currentDef.subtitle}</p>
            </div>
            <div className="text-right font-mono text-[11px] text-slate-500">
              <p>Generado: {generatedTimestamp}</p>
              <p className="font-semibold text-slate-700">Registros incluidos: {filteredData.length}</p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200">
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Registros</span>
              <span className="font-mono font-bold text-base text-slate-900 tabular-nums">{filteredData.length}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Solucionadas</span>
              <span className="font-mono font-bold text-base text-emerald-700 tabular-nums">
                {filteredData.filter(t => t.estado === 'Solucionada y cerrada').length}
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pendientes</span>
              <span className="font-mono font-bold text-base text-amber-700 tabular-nums">
                {filteredData.filter(t => t.estado !== 'Solucionada y cerrada').length}
              </span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cumplimiento Términos</span>
              <span className="font-mono font-bold text-base text-blue-900 tabular-nums">{metrics.tasaCumplimientoTiempos}%</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Radicado</th>
                <th className="py-2.5 px-3">Fecha</th>
                <th className="py-2.5 px-3">Usuario Solicitante</th>
                <th className="py-2.5 px-3">Tipo Solicitud</th>
                <th className="py-2.5 px-3">Canal</th>
                <th className="py-2.5 px-3">Área y Responsable</th>
                <th className="py-2.5 px-3">Fecha Límite</th>
                <th className="py-2.5 px-3">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredData.map(ticket => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-950">{ticket.consecutivo}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{ticket.fechaRecepcion}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{ticket.userName}</td>
                  <td className="py-2.5 px-3">{ticket.tipo}</td>
                  <td className="py-2.5 px-3 text-slate-500">{ticket.canalRecepcion}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-slate-800 font-medium">{ticket.colaboradorAsignado}</span>
                    <span className="text-[10px] text-slate-400 block">{ticket.areaResponsable}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">{ticket.fechaLimite}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ticket.estado === 'Solucionada y cerrada' ? 'bg-emerald-50 text-emerald-700' :
                      ticket.estado === 'Respondida' ? 'bg-sky-50 text-sky-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {ticket.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports History */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">Historial de Reportes Generados Recientemente</h3>
        <div className="space-y-2">
          {reportHistory.map(item => (
            <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-[10px] text-slate-400">Fecha: {item.date} · {item.rows} filas procesadas</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadPDF}
                  className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                >
                  Descargar Copia PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
