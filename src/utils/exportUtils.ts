/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Real PDF & Excel Export Utilities for SomosConnect CRM - Corporación Social Somos Uno
 */

import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { SolicitudPQRS, CRMUser, EncuestaSatisfaccion, ManualCargo } from '../types';

export const exportPQRSToExcel = (tickets: SolicitudPQRS[], filename = 'Reporte_PQRS_SomosUno.xlsx') => {
  const data = tickets.map(t => ({
    'Consecutivo': t.consecutivo,
    'Fecha Recepción': t.fechaRecepcion,
    'Hora': t.horaRecepcion,
    'Usuario': t.userName,
    'Documento': t.userDoc,
    'Tipo': t.tipo,
    'Canal': t.canalRecepcion,
    'Área': t.areaResponsable,
    'Responsable': t.colaboradorAsignado,
    'Prioridad': t.prioridad,
    'Fecha Límite': t.fechaLimite,
    'Estado': t.estado,
    'Descripción': t.descripcion,
    'Respuesta Emitida': t.respuestaEnviada || 'Sin respuesta',
    'Fecha Cierre': t.fechaCierre || 'Abierto',
    'Solución': t.solucionDetalle || 'En trámite'
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Solicitudes PQRS');
  
  // Auto-width
  const max_width = data.reduce((w, r) => Math.max(w, r.Usuario.length), 10);
  worksheet['!cols'] = [
    { wch: 15 }, // Consecutivo
    { wch: 14 }, // Fecha
    { wch: 8 },  // Hora
    { wch: Math.max(max_width, 24) }, // Usuario
    { wch: 14 }, // Documento
    { wch: 16 }, // Tipo
    { wch: 18 }, // Canal
    { wch: 20 }, // Área
    { wch: 22 }, // Responsable
    { wch: 10 }, // Prioridad
    { wch: 14 }, // Fecha Límite
    { wch: 18 }, // Estado
    { wch: 40 }, // Descripción
    { wch: 40 }, // Respuesta
    { wch: 14 }, // Cierre
    { wch: 30 }  // Solución
  ];

  XLSX.writeFile(workbook, filename);
};

export const exportUsersToExcel = (users: CRMUser[], filename = 'Directorio_Usuarios_SomosUno.xlsx') => {
  const data = users.map(u => ({
    'Nombre Completo': u.nombre,
    'Tipo Doc': u.tipoDocumento,
    'No. Documento': u.documento,
    'Correo Electrónico': u.email,
    'Teléfono': u.telefono,
    'Tipo Usuario': u.tipoUsuario,
    'Ciudad': u.ciudad,
    'Dirección': u.direccion,
    'Fecha Registro': u.fechaRegistro,
    'Estado de Atención': u.estadoAtencion,
    'Autorización Ley 1581': u.autorizacionDatos ? 'Sí autorizó' : 'No autorizó',
    'Observaciones': u.observaciones
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios y Beneficiarios');
  XLSX.writeFile(workbook, filename);
};

export const exportReportToPDF = (
  title: string,
  subtitle: string,
  summaryCards: { label: string; value: string | number }[],
  columns: string[],
  rows: (string | number)[][],
  filename = 'Reporte_SomosConnect.pdf'
) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Institutional Header Bar
  doc.setFillColor(0, 51, 102); // #003366 Institutional Navy
  doc.rect(0, 0, pageWidth, 24, 'F');

  // Title in header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CORPORACIÓN SOCIAL SOMOS UNO', 14, 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('SomosConnect CRM · Área de Servicio al Cliente · "Conectamos personas, mejoramos experiencias"', 14, 18);

  // Metadata top right
  const dateStr = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFontSize(8);
  doc.text(`Fecha de emisión: ${dateStr}`, pageWidth - 14, 11, { align: 'right' });
  doc.text('Radicación Oficial y Trazabilidad', pageWidth - 14, 18, { align: 'right' });

  // Document Title
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 34);

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(subtitle, 14, 40);

  // Summary Metrics Strip
  let currentY = 46;
  if (summaryCards && summaryCards.length > 0) {
    const cardWidth = Math.min(48, (pageWidth - 28) / summaryCards.length);
    summaryCards.forEach((card, idx) => {
      const x = 14 + idx * (cardWidth + 4);
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(x, currentY, cardWidth, 14, 2, 2, 'F');
      
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.text(card.label.substring(0, 26), x + 3, currentY + 5);

      doc.setTextColor(0, 51, 102);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(String(card.value), x + 3, currentY + 11);
    });
    currentY += 20;
  }

  // Draw Table Header
  const startX = 14;
  const colWidth = (pageWidth - 28) / columns.length;
  
  doc.setFillColor(226, 232, 240);
  doc.rect(startX, currentY, pageWidth - 28, 8, 'F');
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  
  columns.forEach((col, idx) => {
    doc.text(col, startX + idx * colWidth + 2, currentY + 5.5);
  });

  currentY += 8;

  // Draw Table Rows (up to available height)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  rows.slice(0, 18).forEach((row, rIdx) => {
    if (rIdx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(startX, currentY, pageWidth - 28, 7, 'F');
    }
    
    doc.setTextColor(51, 65, 85);
    row.forEach((cell, cIdx) => {
      const text = String(cell || '').substring(0, 32);
      doc.text(text, startX + cIdx * colWidth + 2, currentY + 5);
    });

    currentY += 7;
  });

  // Footer & Institutional Signature
  const footerY = pageHeight - 14;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, footerY - 4, pageWidth - 14, footerY - 4);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.text('Documento institucional generado automáticamente por SomosConnect CRM · Corporación Social Somos Uno', 14, footerY);
  doc.text('Página 1 de 1 · Conforme a Ley 1755 de 2015 y Ley 1581 de 2012', pageWidth - 14, footerY, { align: 'right' });

  doc.save(filename);
};

export const exportJobManualToPDF = (cargo: ManualCargo) => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Institutional Header
  doc.setFillColor(0, 51, 102);
  doc.rect(0, 0, pageWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CORPORACIÓN SOCIAL SOMOS UNO', 14, 10);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('MANUAL ESPECÍFICO DE FUNCIONES Y COMPETENCIAS LABORALES', 14, 16);

  let y = 32;

  // Title
  doc.setTextColor(0, 51, 102);
  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  doc.text(`CARGO: ${cargo.cargo.toUpperCase()}`, 14, y);
  y += 7;

  // Metadata block
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, y, pageWidth - 28, 18, 2, 2, 'F');
  
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8.5);
  doc.text(`Área: ${cargo.area}`, 18, y + 6);
  doc.text(`Jefe Inmediato: ${cargo.jefeInmediato}`, 18, y + 12);
  doc.text('Código Institucional: CS-MF-2026', pageWidth - 70, y + 6);
  doc.text('Vigencia: 2026 - Actualizada', pageWidth - 70, y + 12);
  y += 24;

  // Objetivo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.text('1. OBJETIVO DEL CARGO', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const objLines = doc.splitTextToSize(cargo.objetivo, pageWidth - 28);
  doc.text(objLines, 14, y);
  y += objLines.length * 4.5 + 4;

  // Funciones Principales
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.text('2. FUNCIONES PRINCIPALES', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  cargo.funciones.forEach(func => {
    const lines = doc.splitTextToSize(`• ${func}`, pageWidth - 32);
    doc.text(lines, 16, y);
    y += lines.length * 4.2;
  });
  y += 4;

  // Responsabilidades & Autoridad
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.text('3. RESPONSABILIDADES Y AUTORIDAD', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  cargo.responsabilidades.forEach(resp => {
    const lines = doc.splitTextToSize(`• Responsabilidad: ${resp}`, pageWidth - 32);
    doc.text(lines, 16, y);
    y += lines.length * 4.2;
  });
  cargo.autoridad.forEach(aut => {
    const lines = doc.splitTextToSize(`• Autoridad: ${aut}`, pageWidth - 32);
    doc.text(lines, 16, y);
    y += lines.length * 4.2;
  });
  y += 4;

  // Perfil requerido
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.text('4. PERFIL REQUERIDO Y COMPETENCIAS', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(`Educación: ${cargo.perfil.educacion}`, 16, y);
  y += 4.5;
  doc.text(`Experiencia: ${cargo.perfil.experiencia}`, 16, y);
  y += 4.5;
  doc.text(`Competencias clave: ${cargo.competencias.join(', ')}`, 16, y);
  y += 6;

  // Indicadores de Desempeño
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(0, 51, 102);
  doc.text('5. INDICADORES DE DESEMPEÑO EVALUADOS', 14, y);
  y += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  cargo.indicadores.forEach(ind => {
    doc.text(`• ${ind}`, 16, y);
    y += 4.5;
  });

  // Footer signature lines
  const sigY = 270;
  doc.setDrawColor(148, 163, 184);
  doc.line(20, sigY, 80, sigY);
  doc.line(pageWidth - 80, sigY, pageWidth - 20, sigY);
  doc.setFontSize(7.5);
  doc.text('Firma Gerente General / Aprobó', 50, sigY + 4, { align: 'center' });
  doc.text('Firma Titular del Cargo / Aceptó', pageWidth - 50, sigY + 4, { align: 'center' });

  doc.save(`Manual_Funciones_${cargo.cargo.replace(/\s+/g, '_')}.pdf`);
};

export const exportUserManualToPDF = () => {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();

  // Institutional Header
  doc.setFillColor(0, 51, 102);
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('CORPORACIÓN SOCIAL SOMOS UNO', 14, 11);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('SomosConnect CRM · Manual Oficial de Usuario de la Plataforma', 14, 18);

  let y = 35;
  doc.setTextColor(0, 51, 102);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('GUÍA Y MANUAL DE USUARIO SOMOSCONNECT CRM', 14, y);
  y += 6;
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Instrucciones paso a paso para la operación, radicación y seguimiento del Servicio al Cliente', 14, y);
  y += 10;

  const sections = [
    {
      num: '1. Ingreso a la Plataforma',
      desc: 'Acceda mediante el navegador seguro o PWA instalada. Seleccione su usuario o rol asignado (Administrador, Gerente, Coordinador, Asesor o Gestor). La sesión guarda la auditoría de cada modificación realizada.'
    },
    {
      num: '2. Registro y Consulta de Usuarios',
      desc: 'En el módulo "Gestión de Usuarios", haga clic en "Nuevo Usuario". Complete nombres, documento, teléfono, correo y tipo. Verifique la casilla de autorización de Habeas Data (Ley 1581 de 2012) para proteger la confidencialidad.'
    },
    {
      num: '3. Radicación de Solicitudes PQRS',
      desc: 'En el módulo "PQRS", presione "Nueva Solicitud". El sistema generará un número consecutivo automático (ej. PQRS-2026-001). Seleccione el tipo de trámite (Petición, Queja, Reclamo, Sugerencia, Felicitación, Información), canal de recepción y prioridad.'
    },
    {
      num: '4. Clasificación y Términos Legales',
      desc: 'El sistema calcula automáticamente la fecha límite de respuesta en días hábiles conforme a la Ley 1755 de 2015 o la configuración de plazos internos de la Corporación.'
    },
    {
      num: '5. Asignación y Trazabilidad',
      desc: 'El Coordinador o Gestor asigna el colaborador y el área responsable. En el módulo "Seguimiento", se registran todas las llamadas, visitas, documentos adjuntos y avances cronológicos con sello de autor.'
    },
    {
      num: '6. Respuesta y Cierre',
      desc: 'Cuando se cuenta con la solución de fondo, ingrese al radicado, redacte la respuesta formal y presione "Registrar Respuesta". Para finalizar el caso, presione "Cerrar Solicitud" documentando la solución alcanzada.'
    },
    {
      num: '7. Aplicación de Encuesta de Satisfacción',
      desc: 'Todo caso resuelto puede ser calificado por el usuario mediante una escala de 1 a 5 estrellas, evaluación de claridad y resolución, retroalimentando el Ciclo PHVA de mejora continua.'
    },
    {
      num: '8. Informes y Respaldo de Datos',
      desc: 'En "Informes", genere reportes por tipo, responsable o fecha. Utilice los botones "Descargar PDF" o "Descargar Excel" para obtener archivos oficiales. En "Seguridad", descargue copias de seguridad en formato JSON.'
    }
  ];

  sections.forEach(sec => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(0, 51, 102);
    doc.text(sec.num, 14, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const lines = doc.splitTextToSize(sec.desc, pageWidth - 28);
    doc.text(lines, 14, y);
    y += lines.length * 4.3 + 4;
  });

  const footerY = 282;
  doc.setDrawColor(203, 213, 225);
  doc.line(14, footerY - 4, pageWidth - 14, footerY - 4);
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(7.5);
  doc.text('SomosConnect CRM · Corporación Social Somos Uno · "Conectamos personas, mejoramos experiencias"', 14, footerY);
  doc.text('Documento Oficial de Soporte', pageWidth - 14, footerY, { align: 'right' });

  doc.save('Manual_Usuario_SomosConnect_CRM.pdf');
};
