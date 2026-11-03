/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Satisfaction Survey View (CSAT) for SomosConnect CRM - Corporación Social Somos Uno
 */

import React, { useState } from 'react';
import { 
  Smile, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Download,
  Filter
} from 'lucide-react';
import { useCRM } from '../context/CRMContext';
import { SolicitudPQRS } from '../types';
import { exportReportToPDF } from '../utils/exportUtils';

interface SatisfactionViewProps {
  onOpenSurveyModal: (ticket: SolicitudPQRS) => void;
  onSelectTicket: (ticket: SolicitudPQRS) => void;
}

export const SatisfactionView: React.FC<SatisfactionViewProps> = ({
  onOpenSurveyModal,
  onSelectTicket
}) => {
  const { encuestas, pqrs, metrics } = useCRM();

  // Ratings calculation
  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let clearYesCount = 0;
  let solvedYesCount = 0;

  encuestas.forEach(e => {
    if (starCounts[e.calificacion] !== undefined) starCounts[e.calificacion]++;
    if (e.respuestaClara === 'Sí') clearYesCount++;
    if (e.solicitudSolucionada === 'Sí') solvedYesCount++;
  });

  const totalSurveys = Math.max(encuestas.length, 1);
  const clearRate = Math.round((clearYesCount / totalSurveys) * 100);
  const solvedRate = Math.round((solvedYesCount / totalSurveys) * 100);

  // Tickets available for survey (solved tickets without survey yet)
  const ticketsToSurvey = pqrs.filter(p => p.estado === 'Solucionada y cerrada' && !p.encuestaId);

  const handleExportPDF = () => {
    const summary = [
      { label: 'Índice de Satisfacción (CSAT)', value: `${metrics.porcentajeSatisfaccion}%` },
      { label: 'Total Encuestas', value: encuestas.length },
      { label: 'Claridad en Respuesta', value: `${clearRate}%` },
      { label: 'Resolución Efectiva', value: `${solvedRate}%` }
    ];

    const columns = ['Radicado', 'Usuario', 'Calificación', 'Respuesta Clara', 'Solucionada', 'Aspecto a Mejorar', 'Comentario'];
    const rows = encuestas.map(e => [
      e.consecutivoPQRS,
      e.userName,
      `${e.calificacion}/5 ★`,
      e.respuestaClara,
      e.solicitudSolucionada,
      e.aspectoMejorar,
      e.comentario
    ]);

    exportReportToPDF(
      'INFORME OFICIAL DE SATISFACCIÓN DEL USUARIO (CSAT)',
      'Consolidado de calificaciones, retroalimentación y sugerencias para el ciclo de mejora continua PHVA',
      summary,
      columns,
      rows,
      'Informe_Satisfaccion_SomosConnect.pdf'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Satisfacción del Usuario (CSAT)</h2>
          <p className="text-xs text-slate-500">
            Medición de la calidad en la atención, claridad de respuestas y efectividad en la solución de casos.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportPDF}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-2xs transition flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Descargar Informe PDF</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Índice Global CSAT</span>
            <Smile className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-extrabold text-purple-900 font-mono tabular-nums">
            {metrics.porcentajeSatisfaccion}%
          </p>
          <p className="text-[11px] text-slate-500">Meta institucional establecida: 90%</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Claridad de Respuesta</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-extrabold text-blue-900 font-mono tabular-nums">
            {clearRate}%
          </p>
          <p className="text-[11px] text-slate-500">Consideran la respuesta clara y oportuna</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolución de Fondo</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-900 font-mono tabular-nums">
            {solvedRate}%
          </p>
          <p className="text-[11px] text-slate-500">Problema solucionado satisfactoriamente</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Encuestas Recibidas</span>
            <MessageSquare className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {encuestas.length}
          </p>
          <p className="text-[11px] text-slate-500">Muestra evaluada de casos resueltos</p>
        </div>
      </div>

      {/* Ratings Distribution & Pending Surveys */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Breakdown */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Distribución de Calificaciones (1 a 5 Estrellas)</h3>
          
          <div className="space-y-3 pt-1">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars] || 0;
              const pct = Math.round((count / totalSurveys) * 100);

              return (
                <div key={stars} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <span>{stars}</span>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="font-mono text-slate-600 tabular-nums">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stars === 5 ? 'bg-emerald-500' :
                        stars === 4 ? 'bg-sky-500' :
                        stars === 3 ? 'bg-amber-400' :
                        stars === 2 ? 'bg-orange-400' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending cases for survey callout */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Aplicar Nuevas Encuestas de Calidad</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Casos resueltos y cerrados que aún no cuentan con encuesta de satisfacción registrada:
            </p>

            {ticketsToSurvey.length === 0 ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                ✓ No hay radicados cerrados pendientes de encuesta en este momento.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 pt-1">
                {ticketsToSurvey.map(ticket => (
                  <div
                    key={ticket.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <p className="font-mono font-bold text-xs text-blue-900">{ticket.consecutivo}</p>
                      <p className="text-xs font-semibold text-slate-800 truncate">{ticket.userName}</p>
                      <p className="text-[10px] text-slate-400">{ticket.tipo} · Cerrado: {ticket.fechaCierre}</p>
                    </div>
                    <button
                      onClick={() => onOpenSurveyModal(ticket)}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-xs rounded-lg transition shrink-0"
                    >
                      Aplicar Encuesta
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900">
            <strong>Impacto PHVA:</strong> Los resultados de satisfacción retroalimentan las fases de Verificación y Actuación para optimizar protocolos.
          </div>
        </div>
      </div>

      {/* Verbatim comments list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm">Comentarios y Sugerencias de los Usuarios</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {encuestas.map(enc => (
            <div key={enc.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-xs text-blue-900">{enc.consecutivoPQRS}</span>
                  <p className="font-semibold text-slate-800 text-xs">{enc.userName}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= enc.calificacion ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-100">
                "{enc.comentario}"
              </p>

              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/80 flex items-center justify-between">
                <span>Aspecto a mejorar: <strong className="text-slate-700">{enc.aspectoMejorar}</strong></span>
                <span className="font-mono tabular-nums">{enc.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
