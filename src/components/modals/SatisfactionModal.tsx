/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * User Satisfaction Survey Modal for SomosConnect CRM
 */

import React, { useState } from 'react';
import { X, Star, HeartHandshake, Check, AlertCircle } from 'lucide-react';
import { useCRM } from '../../context/CRMContext';
import { SolicitudPQRS } from '../../types';

interface SatisfactionModalProps {
  ticket: SolicitudPQRS | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SatisfactionModal: React.FC<SatisfactionModalProps> = ({
  ticket,
  isOpen,
  onClose
}) => {
  const { submitSatisfactionSurvey } = useCRM();

  const [calificacion, setCalificacion] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [respuestaClara, setRespuestaClara] = useState<'Sí' | 'Parcialmente' | 'No'>('Sí');
  const [solicitudSolucionada, setSolicitudSolucionada] = useState<'Sí' | 'En trámite' | 'No'>('Sí');
  const [aspectoMejorar, setAspectoMejorar] = useState('');
  const [comentario, setComentario] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !ticket) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = submitSatisfactionSurvey({
      pqrsId: ticket.id,
      consecutivoPQRS: ticket.consecutivo,
      userId: ticket.userId,
      userName: ticket.userName,
      calificacion,
      respuestaClara,
      solicitudSolucionada,
      aspectoMejorar: aspectoMejorar.trim() || 'Ninguno especificado',
      comentario: comentario.trim() || 'Atención satisfactoria'
    });

    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#002b55] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-base font-bold">Encuesta de Satisfacción del Usuario</h2>
              <p className="text-xs text-sky-200">Radicado: {ticket.consecutivo} · {ticket.userName}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Question 1: Rating Stars */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              1. ¿Cómo califica la atención recibida por la Corporación Social Somos Uno? *
            </label>
            <div className="flex items-center justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating !== null ? hoverRating >= star : calificacion >= star);
                return (
                  <button
                    type="button"
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setCalificacion(star)}
                    className="p-1.5 focus:outline-hidden transition transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        active ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-semibold text-slate-600">
              {calificacion === 5 ? 'Excelente (5 de 5)' :
               calificacion === 4 ? 'Muy Buena (4 de 5)' :
               calificacion === 3 ? 'Aceptable (3 de 5)' :
               calificacion === 2 ? 'Deficiente (2 de 5)' : 'Muy Insatisfactoria (1 de 5)'}
            </p>
          </div>

          {/* Question 2: Clear response */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">
              2. ¿La respuesta proporcionada fue clara y comprensible? *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Sí', 'Parcialmente', 'No'] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setRespuestaClara(opt)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition ${
                    respuestaClara === opt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Request solved */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">
              3. ¿Su solicitud fue solucionada de fondo? *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Sí', 'En trámite', 'No'] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setSolicitudSolucionada(opt)}
                  className={`py-2 px-3 rounded-lg border text-xs font-medium transition ${
                    solicitudSolucionada === opt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4: Aspect to improve */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              4. ¿Qué aspecto considera que debemos mejorar en nuestro servicio?
            </label>
            <input
              type="text"
              value={aspectoMejorar}
              onChange={e => setAspectoMejorar(e.target.value)}
              placeholder="Ej. Tiempos de espera, mayor claridad en los requisitos..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Question 5: Additional comments */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              5. Comentarios u observaciones adicionales
            </label>
            <textarea
              rows={3}
              value={comentario}
              onChange={e => setComentario(e.target.value)}
              placeholder="Comparta cualquier detalle sobre su experiencia con el equipo de Somos Uno..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Evaluación</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
