/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Initial reference data for SomosConnect CRM - Corporación Social Somos Uno
 * Grounded in the academic project document (150 total solicitudes, 120 solucionadas, 30 pendientes, 90% satisfacción).
 */

import { 
  CRMUser, 
  SolicitudPQRS, 
  EncuestaSatisfaccion, 
  NormaLegal, 
  TerminoConfig, 
  ManualCargo, 
  SystemUser 
} from '../types';

export const SYSTEM_USERS: SystemUser[] = [
  {
    id: 'sys-1',
    nombre: 'Dra. Claudia Marcela Restrepo',
    email: 'gerencia@somosuno.org.co',
    cargo: 'Gerente',
    permisos: {
      canDelete: true,
      canAssign: true,
      canRespond: true,
      canClose: true,
      canConfigureLegal: true,
      canEditFunctions: true,
      canExportReports: true,
      canManageUsers: true,
    }
  },
  {
    id: 'sys-2',
    nombre: 'Ing. Carlos Andrés Montoya',
    email: 'admin.plataforma@somosuno.org.co',
    cargo: 'Administrador',
    permisos: {
      canDelete: true,
      canAssign: true,
      canRespond: true,
      canClose: true,
      canConfigureLegal: true,
      canEditFunctions: true,
      canExportReports: true,
      canManageUsers: true,
    }
  },
  {
    id: 'sys-3',
    nombre: 'Lic. Laura Camila Gómez',
    email: 'coordinacion.servicio@somosuno.org.co',
    cargo: 'Coordinador de Servicio al Cliente',
    permisos: {
      canDelete: false,
      canAssign: true,
      canRespond: true,
      canClose: true,
      canConfigureLegal: false,
      canEditFunctions: false,
      canExportReports: true,
      canManageUsers: true,
    }
  },
  {
    id: 'sys-4',
    nombre: 'Santiago Morales Pineda',
    email: 'gestor.pqrs@somosuno.org.co',
    cargo: 'Gestor de PQRS',
    permisos: {
      canDelete: false,
      canAssign: true,
      canRespond: true,
      canClose: true,
      canConfigureLegal: false,
      canEditFunctions: false,
      canExportReports: true,
      canManageUsers: false,
    }
  },
  {
    id: 'sys-5',
    nombre: 'Valentina Ospina Vélez',
    email: 'asesor.servicio1@somosuno.org.co',
    cargo: 'Asesor de Servicio al Cliente',
    permisos: {
      canDelete: false,
      canAssign: false,
      canRespond: true,
      canClose: false,
      canConfigureLegal: false,
      canEditFunctions: false,
      canExportReports: true,
      canManageUsers: false,
    }
  }
];

export const INITIAL_USERS: CRMUser[] = [
  {
    id: 'usr-1',
    nombre: 'María Elena Salazar Henao',
    tipoDocumento: 'CC',
    documento: '43567890',
    email: 'maria.salazar@correo.com',
    telefono: '3124567890',
    tipoUsuario: 'Beneficiario',
    direccion: 'Carrera 45 # 67 - 23, Barrio Prado',
    ciudad: 'Medellín',
    fechaRegistro: '2026-01-10',
    estadoAtencion: 'Al día',
    observaciones: 'Líder comunitaria del programa de comedores comunitarios',
    autorizacionDatos: true,
  },
  {
    id: 'usr-2',
    nombre: 'Jorge Ignacio Valencia Castro',
    tipoDocumento: 'CC',
    documento: '71234980',
    email: 'jorge.valencia@empresa.com',
    telefono: '3007890123',
    tipoUsuario: 'Aliado',
    direccion: 'Calle 10 # 32 - 15, El Poblado',
    ciudad: 'Medellín',
    fechaRegistro: '2026-01-15',
    estadoAtencion: 'Al día',
    observaciones: 'Representante de la Fundación Aliada Crecer Juntos',
    autorizacionDatos: true,
  },
  {
    id: 'usr-3',
    nombre: 'Diana Marcela Cárdenas Rojas',
    tipoDocumento: 'CC',
    documento: '52890123',
    email: 'diana.cardenas@gmail.com',
    telefono: '3156789045',
    tipoUsuario: 'Beneficiario',
    direccion: 'Diagonal 45 # 12 - 08, Suba',
    ciudad: 'Bogotá',
    fechaRegistro: '2026-01-20',
    estadoAtencion: 'Con solicitud pendiente',
    observaciones: 'Beneficiaria de becas de capacitación digital',
    autorizacionDatos: true,
  },
  {
    id: 'usr-4',
    nombre: 'Carlos Arturo Quintero Gil',
    tipoDocumento: 'CC',
    documento: '98456123',
    email: 'carlos.quintero@servicios.co',
    telefono: '3189012345',
    tipoUsuario: 'Proveedor',
    direccion: 'Avenida 6N # 28 - 40',
    ciudad: 'Cali',
    fechaRegistro: '2026-02-01',
    estadoAtencion: 'Al día',
    observaciones: 'Proveedor de kits escolares y materiales pedagógicos',
    autorizacionDatos: true,
  },
  {
    id: 'usr-5',
    nombre: 'Luz Marina Duque Arango',
    tipoDocumento: 'CC',
    documento: '32567123',
    email: 'luz.duque@outlook.com',
    telefono: '3112345678',
    tipoUsuario: 'Comunidad General',
    direccion: 'Calle 50 # 70 - 12, Manrique',
    ciudad: 'Medellín',
    fechaRegistro: '2026-02-12',
    estadoAtencion: 'En atención',
    observaciones: 'Solicitante de información sobre brigadas de salud integral',
    autorizacionDatos: true,
  },
  {
    id: 'usr-6',
    nombre: 'Andrés Felipe Betancur Londoño',
    tipoDocumento: 'CC',
    documento: '1017234567',
    email: 'andres.betancur@universidad.edu.co',
    telefono: '3045678912',
    tipoUsuario: 'Afiliado',
    direccion: 'Circular 4 # 73 - 10, Laureles',
    ciudad: 'Medellín',
    fechaRegistro: '2026-02-18',
    estadoAtencion: 'Con solicitud pendiente',
    observaciones: 'Afiliado al programa de voluntariado corporativo',
    autorizacionDatos: true,
  },
  {
    id: 'usr-7',
    nombre: 'Gloria Inés Patiño Mendoza',
    tipoDocumento: 'CC',
    documento: '43987654',
    email: 'gloria.patino@redsocial.org',
    telefono: '3109876543',
    tipoUsuario: 'Beneficiario',
    direccion: 'Carrera 15 # 40 - 22',
    ciudad: 'Bucaramanga',
    fechaRegistro: '2026-02-25',
    estadoAtencion: 'Al día',
    observaciones: 'Madre beneficiaria del programa de primera infancia',
    autorizacionDatos: true,
  },
  {
    id: 'usr-8',
    nombre: 'Fundación Huellas de Amor',
    tipoDocumento: 'NIT',
    documento: '900876543-1',
    email: 'contacto@huellasdeamor.org',
    telefono: '6044445566',
    tipoUsuario: 'Aliado',
    direccion: 'Calle 33 # 65 - 80',
    ciudad: 'Medellín',
    fechaRegistro: '2026-03-01',
    estadoAtencion: 'Al día',
    observaciones: 'Convenio interinstitucional para atención a adulto mayor',
    autorizacionDatos: true,
  }
];

export const INITIAL_NORMATIVIDAD: NormaLegal[] = [
  {
    id: 'norma-1',
    nombre: 'Constitución Política de Colombia de 1991',
    numeroAno: 'Artículo 23 de 1991',
    descripcion: 'Reconoce el derecho fundamental a presentar peticiones respetuosas a las autoridades por motivos de interés general o particular y a obtener pronta resolución.',
    aplicacion: 'Base fundamental para garantizar que toda persona que acuda a Corporación Social Somos Uno reciba una respuesta respetuosa, de fondo, oportuna y clara.',
    recomendaciones: 'Nunca dejar una solicitud sin respuesta formal; emitir respuestas dentro de los plazos y verificar que resuelvan el fondo de lo pedido.',
    diasHabilesPorDefecto: 15,
    fuenteUrl: 'https://www.secretariasenado.gov.co/constitucion-politica'
  },
  {
    id: 'norma-2',
    nombre: 'Ley 1755 de 2015',
    numeroAno: 'Ley Estatutaria 1755 de 2015',
    descripcion: 'Regula integralmente el derecho fundamental de petición en Colombia. Establece modalidades, reglas generales y términos según el tipo de solicitud. Los artículos 32 y 33 reglamentan el derecho de petición ante organizaciones privadas.',
    aplicacion: 'Fija los términos legales máximos de respuesta: 10 días para solicitudes de información y copias; 15 días para peticiones de interés particular o quejas/reclamos; 30 días para consultas técnicas especializadas.',
    recomendaciones: 'Configurar en el CRM los plazos diferenciados según la naturaleza jurídica y el objeto pedido, advirtiendo prórrogas justificadas antes del vencimiento.',
    diasHabilesPorDefecto: 15,
    fuenteUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=65334'
  },
  {
    id: 'norma-3',
    nombre: 'Ley 1581 de 2012 (Habeas Data)',
    numeroAno: 'Ley Estatutaria 1581 de 2012',
    descripcion: 'Régimen General de Protección de Datos Personales en Colombia. Desarrolla el derecho constitucional de conocer, actualizar y rectificar información recopilada en bancos de datos.',
    aplicacion: 'Obligatoriedad de solicitar consentimiento previo y expreso para la recolección de datos de usuarios, beneficiarios y aliados en todos los formularios de atención.',
    recomendaciones: 'Mantener control de acceso estricto por roles en el CRM, registrar bitácoras de modificación y nunca divulgar datos sensibles de niños o beneficiarios vulnerables.',
    diasHabilesPorDefecto: 10,
    fuenteUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981'
  },
  {
    id: 'norma-4',
    nombre: 'Decreto 1074 de 2015',
    numeroAno: 'Decreto Único Reglamentario 1074 de 2015',
    descripcion: 'Decreto Reglamentario del Sector Comercio, Industria y Turismo. Compila disposiciones sobre el Registro Nacional de Bases de Datos y medidas de seguridad de la información.',
    aplicacion: 'Guía la implementación de políticas internas y directrices de tratamiento seguro de la información corporativa y de los titulares atendidos.',
    recomendaciones: 'Establecer copias de seguridad periódicas, cifrado de accesos y política de conservación documental de las PQRS resueltas.',
    diasHabilesPorDefecto: 15,
    fuenteUrl: 'https://www.suin-juriscol.gov.co/'
  },
  {
    id: 'norma-5',
    nombre: 'Ley 1480 de 2011 (Estatuto del Consumidor)',
    numeroAno: 'Ley 1480 de 2011',
    descripcion: 'Estatuto del Consumidor. Protege, promueve y garantiza la efectividad de los derechos de los consumidores frente a relaciones comerciales y de prestación de servicios.',
    aplicacion: 'Aplica cuando la Corporación comercializa productos sociales, servicios formativos o tiene relaciones contractuales de consumo con usuarios.',
    recomendaciones: 'Atender los reclamos de garantía o inconformidad dentro de los 15 días hábiles legales y documentar la trazabilidad completa del bien o servicio.',
    diasHabilesPorDefecto: 15,
    fuenteUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=44306'
  },
  {
    id: 'norma-6',
    nombre: 'Ley 1437 de 2011 (CPACA)',
    numeroAno: 'Ley 1437 de 2011',
    descripcion: 'Código de Procedimiento Administrativo y de lo Contencioso Administrativo. Regula las actuaciones administrativas y recursos en el ejercicio de funciones públicas delegadas.',
    aplicacion: 'Aplica cuando la Corporación ejecuta recursos públicos o contratos interadministrativos que impliquen ejercicio subsidiario de función pública.',
    recomendaciones: 'Verificar la calidad de las respuestas en cuanto a motivación suficiente, notificación formal y respeto al debido proceso administrativo.',
    diasHabilesPorDefecto: 15,
    fuenteUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41249'
  },
  {
    id: 'norma-7',
    nombre: 'Ley 1712 de 2014 (Transparencia)',
    numeroAno: 'Ley de Transparencia y del Acceso a la Información Pública',
    descripcion: 'Regula el principio de máxima publicidad y acceso libre a la información generada o en posesión de sujetos obligados o entidades receptoras de fondos públicos.',
    aplicacion: 'Garantiza que la Corporación rinda cuentas a la sociedad civil y a los beneficiarios sobre la destinación social y los proyectos ejecutados.',
    recomendaciones: 'Facilitar la entrega de informes de gestión pública en un plazo máximo de 10 días hábiles cuando medie solicitud ciudadana formal.',
    diasHabilesPorDefecto: 10,
    fuenteUrl: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=56882'
  }
];

export const INITIAL_TERMINOS_CONFIG: TerminoConfig[] = [
  {
    tipoPQRS: 'Petición',
    diasHabiles: 15,
    normaReferencia: 'Ley 1755 de 2015, Art. 14, Numeral 1',
    aplicaEntidadPrivada: true,
    descripcion: 'Peticiones de interés particular o general sobre servicios de la corporación.'
  },
  {
    tipoPQRS: 'Queja',
    diasHabiles: 15,
    normaReferencia: 'Ley 1755 de 2015 y Políticas Internas CS Uno',
    aplicaEntidadPrivada: true,
    descripcion: 'Manifestación de desacuerdo por conducta o atención de un colaborador.'
  },
  {
    tipoPQRS: 'Reclamo',
    diasHabiles: 15,
    normaReferencia: 'Ley 1480 de 2011 / Ley 1755 de 2015',
    aplicaEntidadPrivada: true,
    descripcion: 'Inconformidad con la calidad, prestación o entrega de un servicio o ayuda social.'
  },
  {
    tipoPQRS: 'Sugerencia',
    diasHabiles: 10,
    normaReferencia: 'Procedimiento de Mejora Continua PHVA',
    aplicaEntidadPrivada: true,
    descripcion: 'Propuestas de los usuarios para mejorar procesos o programas sociales.'
  },
  {
    tipoPQRS: 'Felicitación',
    diasHabiles: 5,
    normaReferencia: 'Protocolo de Reconocimiento al Colaborador',
    aplicaEntidadPrivada: true,
    descripcion: 'Agradecimientos y exaltaciones por la labor realizada.'
  },
  {
    tipoPQRS: 'Solicitud de información',
    diasHabiles: 10,
    normaReferencia: 'Ley 1755 de 2015, Art. 14, Numeral 2 / Ley 1712 de 2014',
    aplicaEntidadPrivada: true,
    descripcion: 'Peticiones de consulta de documentos, requisitos de vinculación y datos corporativos.'
  }
];

export const INITIAL_MANUAL_CARGOS: ManualCargo[] = [
  {
    id: 'cargo-gerente',
    cargo: 'Gerente',
    area: 'Dirección General',
    jefeInmediato: 'Junta Directiva',
    objetivo: 'Dirigir, coordinar y supervisar integralmente la gestión institucional y estratégica de la Corporación Social Somos Uno, garantizando el cumplimiento de los principios corporativos, la sostenibilidad y la excelencia en el servicio a la comunidad.',
    funciones: [
      'Dirigir y supervisar la gestión general de la organización y el área de atención.',
      'Aprobar las políticas, directrices, manuales y procedimientos de servicio al cliente y PQRS.',
      'Revisar los informes ejecutivos de gestión, tiempos de respuesta y niveles de satisfacción.',
      'Tomar decisiones estratégicas frente a quejas críticas, contingencias o riesgos reputacionales.',
      'Evaluar periódicamente los resultados del área frente a las metas institucionales.',
      'Autorizar y asignar recursos para las acciones de mejora continua (Ciclo PHVA).'
    ],
    responsabilidades: [
      'Garantizar el cumplimiento de los estatutos de la Corporación y la normatividad legal colombiana.',
      'Asegurar la debida reserva, transparencia y tratamiento ético de los datos personales (Ley 1581 de 2012).',
      'Rendir cuentas ante la Junta Directiva y asamblea sobre el desempeño del servicio al cliente.'
    ],
    autoridad: [
      'Aprobación final de presupuestos y contrataciones para plataformas de atención.',
      'Autorización de eliminaciones extraordinarias de registros en base de datos.',
      'Resolución de casos de PQRS escalados por alto impacto social o jurídico.'
    ],
    perfil: {
      educacion: 'Profesional en Administración, Ciencias Sociales, Derecho, Ingeniería o afines con Especialización o Maestría.',
      experiencia: 'Mínimo 5 años en cargos directivos o gerenciales en organizaciones sociales o de servicios.',
      conocimientos: [
        'Gestión estratégica y liderazgo organizacional',
        'Normativa colombiana en derecho de petición y protección de datos',
        'Sistemas de gestión de calidad y ciclo PHVA',
        'Finanzas y administración de proyectos sociales'
      ]
    },
    competencias: ['Visión estratégica', 'Toma de decisiones', 'Liderazgo inspirador', 'Negociación y resolución de conflictos'],
    indicadores: [
      'Porcentaje global de satisfacción de beneficiarios (Meta >= 90%)',
      'Cumplimiento del plan estratégico de atención (Meta >= 95%)',
      'Índice de resolución favorable de quejas y reclamos'
    ]
  },
  {
    id: 'cargo-coordinador',
    cargo: 'Coordinador de Servicio al Cliente',
    area: 'Servicio al Cliente',
    jefeInmediato: 'Gerente General',
    objetivo: 'Organizar, liderar y controlar operativamente los procesos de recepción, asignación, seguimiento y respuesta de todas las solicitudes, garantizando el cumplimiento de los tiempos de respuesta y la calidad del servicio.',
    funciones: [
      'Organizar y supervisar el equipo de atención y la operación de todos los canales de comunicación.',
      'Distribuir y asignar equilibradamente las solicitudes entre los colaboradores del equipo.',
      'Controlar permanentemente los tiempos límite de respuesta y alertar sobre casos próximos a vencer.',
      'Verificar la calidad, redacción y pertinencia de las respuestas emitidas a los usuarios.',
      'Revisar diariamente los casos pendientes, en proceso y vencidos para tomar acciones operativas.',
      'Elaborar los informes consolidados de gestión, estadísticas de PQRS y resultados de encuestas.',
      'Proponer y liderar acciones de mejora correctivas y preventivas del Ciclo PHVA.'
    ],
    responsabilidades: [
      'Cumplir y hacer cumplir los términos de respuesta fijados en el CRM (SLA legal e institucional).',
      'Garantizar la trazabilidad y registro íntegro de todas las actuaciones en el expediente de cada caso.',
      'Velar por la cordialidad, empatía y efectividad en la interacción con usuarios y beneficiarios.'
    ],
    autoridad: [
      'Reasignación de solicitudes entre asesores y áreas funcionales.',
      'Aprobación y firma de respuestas a solicitudes de mediana y alta complejidad.',
      'Definición de turnos y prioridades de atención en canales de contacto.'
    ],
    perfil: {
      educacion: 'Profesional en Trabajo Social, Comunicación, Administración, Psicología o afines.',
      experiencia: 'Mínimo 3 años coordinando áreas de atención al cliente, PQRS o soporte comunitario.',
      conocimientos: [
        'Gestión operativa de PQRS y CRM',
        'Manejo de indicadores de servicio (CSAT, SLA, tiempos promedio)',
        'Legislación colombiana sobre derecho de petición y Habeas Data',
        'Modelos de atención humanizada a población vulnerable'
      ]
    },
    competencias: ['Capacidad analítica', 'Organización del trabajo', 'Comunicación asertiva', 'Gestión bajo presión'],
    indicadores: [
      'Tiempo promedio de respuesta de PQRS (Meta <= 5 días hábiles)',
      'Porcentaje de cumplimiento de términos legales (Meta >= 98%)',
      'Porcentaje de quejas solucionadas en primera instancia'
    ]
  },
  {
    id: 'cargo-asesor',
    cargo: 'Asesor de Servicio al Cliente',
    area: 'Servicio al Cliente',
    jefeInmediato: 'Coordinador de Servicio al Cliente',
    objetivo: 'Atender con calidez, respeto y eficacia a los usuarios a través de los diferentes canales, registrando oportunamente sus solicitudes en la plataforma y brindando orientación clara y precisa.',
    funciones: [
      'Recibir y registrar de forma completa e inmediata las solicitudes recibidas por cualquier canal.',
      'Atender a los usuarios con enfoque de derechos, cordialidad y escucha activa.',
      'Clasificar adecuadamente las PQRS según su naturaleza y los criterios del CRM.',
      'Brindar información clara, oportuna y veraz sobre programas, requisitos y convocatorias.',
      'Realizar seguimiento riguroso a los casos asignados y mantener informado al solicitante.',
      'Registrar formalmente las respuestas y soluciones acordadas en el sistema.',
      'Aplicar la encuesta de satisfacción del usuario al finalizar la atención.',
      'Mantener una comunicación respetuosa, clara y profesional en todo momento.'
    ],
    responsabilidades: [
      'Verificar la identidad del solicitante y obtener la autorización de tratamiento de datos personales.',
      'Redactar respuestas con excelente ortografía, tono empático y fundamento fáctico.',
      'Reportar inmediatamente al coordinador cualquier anomalía o queja de alta prioridad.'
    ],
    autoridad: [
      'Resolución directa de solicitudes de información y trámites de primer nivel.',
      'Solicitud de documentos complementarios al usuario para avanzar en su trámite.'
    ],
    perfil: {
      educacion: 'Técnico, tecnólogo o estudiante universitario en áreas administrativas, sociales o humanas.',
      experiencia: 'Mínimo 1 año en servicio al cliente, atención telefónica, presencial o gestión comunitaria.',
      conocimientos: [
        'Manejo de herramientas ofimáticas y plataformas CRM',
        'Técnicas de redacción formal y comunicación asertiva',
        'Manejo de situaciones difíciles y resolución pacífica de quejas'
      ]
    },
    competencias: ['Empatía', 'Escucha activa', 'Orientación al servicio', 'Agilidad en captura de datos'],
    indicadores: [
      'Calificación promedio en encuestas de satisfacción personal (Meta >= 4.5/5)',
      'Volumen de solicitudes atendidas y gestionadas por mes',
      'Porcentaje de casos cerrados oportunamente dentro de su asignación'
    ]
  },
  {
    id: 'cargo-gestor-pqrs',
    cargo: 'Gestor de PQRS',
    area: 'Servicio al Cliente / Jurídico',
    jefeInmediato: 'Coordinador de Servicio al Cliente',
    objetivo: 'Administrar el ciclo integral de las peticiones, quejas, reclamos y sugerencias, velando por el rigor técnico, la completitud de la información y el cumplimiento estricto de los plazos legales aplicables.',
    funciones: [
      'Administrar y auditar la bandeja central de peticiones, quejas, reclamos y sugerencias.',
      'Verificar que la información y soportes de cada solicitud radicada cumplan los requisitos formales.',
      'Clasificar técnicamente los casos y canalizarlos al área competente (Jurídica, Trabajo Social, etc.).',
      'Hacer seguimiento diario a los términos de respuesta aplicables (10, 15 o 30 días hábiles).',
      'Articular y preparar con las áreas involucradas los proyectos de respuesta de fondo.',
      'Mantener actualizados todos los registros, anexos y evidencias en el expediente digital.',
      'Generar informes periódicos sobre tipología de reclamos, causas raíz y áreas más recurrentes.'
    ],
    responsabilidades: [
      'Evitar el acaecimiento de silencios administrativos o vencimientos sin respuesta.',
      'Notificar oportunamente al peticionario las ampliaciones de término cuando la complejidad lo exija.',
      'Custodiar el archivo digital y físico de los radicados de PQRS conforme a la ley.'
    ],
    autoridad: [
      'Requerir a las diferentes áreas internas la entrega de información para responder PQRS.',
      'Devolver solicitudes que no cuenten con la fundamentación o documentación requerida.',
      'Emitir alertas de vencimiento a directores y coordinadores de área.'
    ],
    perfil: {
      educacion: 'Profesional o tecnólogo en Derecho, Administración Pública, Gestión Documental o afines.',
      experiencia: 'Mínimo 2 años en radicación, sustanciación o gestión jurídica de PQRS.',
      conocimientos: [
        'Régimen legal del derecho de petición (Ley 1755 de 2015)',
        'Estatuto del Consumidor y Derecho Administrativo',
        'Gestión documental y trazabilidad de expedientes'
      ]
    },
    competencias: ['Rigor normativo', 'Atención al detalle', 'Capacidad de redacción jurídica y formal', 'Organización'],
    indicadores: [
      'Cero solicitudes con vencimiento de plazo legal (100% de oportunidad)',
      'Tasa de respuesta de fondo sin requerimientos de tutela o reiteraciones',
      'Tiempo promedio de radicación y direccionamiento interno (<= 24 horas)'
    ]
  },
  {
    id: 'cargo-administrador',
    cargo: 'Administrador de la plataforma',
    area: 'Tecnología de la Información / Sistemas',
    jefeInmediato: 'Gerente General',
    objetivo: 'Garantizar la disponibilidad, seguridad, integridad y correcto funcionamiento técnico de la plataforma tecnológica SomosConnect CRM, administrando los accesos y salvaguardando los datos de la Corporación.',
    funciones: [
      'Crear, configurar y administrar los perfiles de usuarios del sistema y sus credenciales.',
      'Asignar roles y vigilar la matriz de permisos de acceso conforme a la política de seguridad.',
      'Configurar parámetros del sistema, tipos de PQRS, canales y plazos de respuesta en días hábiles.',
      'Realizar copias de seguridad periódicas y verificar su restaurabilidad (Backups).',
      'Gestionar actualizaciones de la plataforma y mejoras tecnológicas.',
      'Supervisar la seguridad perimetral, prevenir accesos no autorizados y auditar registros de actividad.',
      'Administrar la instalación y compatibilidad PWA en los dispositivos de la Corporación.',
      'Brindar soporte técnico y capacitación continua a los usuarios de la plataforma.'
    ],
    responsabilidades: [
      'Asegurar el cumplimiento de los estándares de protección de bases de datos de la SIC (Ley 1581 de 2012).',
      'Mantener una disponibilidad operativa de la plataforma igual o superior al 99.5%.',
      'Proteger la confidencialidad de las claves y perfiles maestros de la organización.'
    ],
    autoridad: [
      'Bloqueo preventivo de cuentas de usuario por comportamiento sospechoso.',
      'Modificación de parámetros técnicos y configuración de variables de entorno.',
      'Aprobación técnica de despliegues y migraciones de datos.'
    ],
    perfil: {
      educacion: 'Ingeniero de Sistemas, Software, Telemática o tecnólogo afín.',
      experiencia: 'Mínimo 2 años en administración de CRM, bases de datos o plataformas cloud.',
      conocimientos: [
        'Arquitectura web moderna (React, TypeScript, APIs REST)',
        'Seguridad de la información y autenticación basada en roles (RBAC)',
        'Bases de datos y políticas de respaldos estructurados',
        'Gestión de Progressive Web Apps (PWA) y navegadores web'
      ]
    },
    competencias: ['Resolución técnica de problemas', 'Proactividad', 'Ciberseguridad', 'Servicio al cliente interno'],
    indicadores: [
      'Disponibilidad operativa de la plataforma (Meta >= 99.5%)',
      'Tiempo de atención y resolución de incidencias técnicas (<= 2 horas)',
      'Frecuencia y efectividad de copias de seguridad (100% semanales)'
    ]
  }
];

// Academic mock tickets representing the 150 illustrative cases from the PDF
// 120 Solucionadas, 30 Pendientes/En Proceso (incluye alertas de vencimiento)
export const INITIAL_PQRS: SolicitudPQRS[] = [
  {
    id: 'pqrs-1',
    consecutivo: 'PQRS-2026-001',
    userId: 'usr-1',
    userName: 'María Elena Salazar Henao',
    userDoc: '43567890',
    userEmail: 'maria.salazar@correo.com',
    userPhone: '3124567890',
    fechaRecepcion: '2026-02-02',
    horaRecepcion: '08:30',
    tipo: 'Petición',
    descripcion: 'Solicita inclusión de 15 familias vulnerables del barrio Prado en el programa de dotación alimentaria mensual.',
    canalRecepcion: 'Atención presencial',
    areaResponsable: 'Trabajo Social',
    colaboradorAsignado: 'Santiago Morales Pineda',
    prioridad: 'Alta',
    fechaLimite: '2026-02-23',
    diasTermino: 15,
    normaAplicable: 'Ley 1755 de 2015 - Art. 14, Numeral 1',
    estado: 'Solucionada y cerrada',
    documentosAdjuntos: [
      { id: 'adj-1', nombre: 'Censo_Barrio_Prado_2026.pdf', tamano: '1.2 MB', tipo: 'application/pdf', fecha: '2026-02-02' }
    ],
    observaciones: 'El censo vecinal fue verificado con visita domiciliaria.',
    respuestaEnviada: 'Se aprueba la focalización de las 15 familias en la fase 1 del programa de seguridad alimentaria con entrega a partir del 1 de marzo.',
    fechaCierre: '2026-02-18',
    solucionDetalle: 'Familias vinculadas al sistema de subsidio alimentario comunal.',
    actividades: [
      { id: 'act-1', fecha: '2026-02-02 08:35', autor: 'Santiago Morales Pineda', rol: 'Gestor de PQRS', accion: 'Radicación de la solicitud' },
      { id: 'act-2', fecha: '2026-02-05 14:20', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Visita de verificación técnica realizada' },
      { id: 'act-3', fecha: '2026-02-18 10:15', autor: 'Valentina Ospina Vélez', rol: 'Asesor', accion: 'Notificación oficial de respuesta aprobatoria y cierre' }
    ]
  },
  {
    id: 'pqrs-2',
    consecutivo: 'PQRS-2026-002',
    userId: 'usr-3',
    userName: 'Diana Marcela Cárdenas Rojas',
    userDoc: '52890123',
    userEmail: 'diana.cardenas@gmail.com',
    userPhone: '3156789045',
    fechaRecepcion: '2026-02-10',
    horaRecepcion: '10:15',
    tipo: 'Queja',
    descripcion: 'Inconformidad por retraso de 40 minutos en el inicio de la sesión del taller de alfabetización digital y falta de material impreso.',
    canalRecepcion: 'WhatsApp',
    areaResponsable: 'Servicio al Cliente',
    colaboradorAsignado: 'Valentina Ospina Vélez',
    prioridad: 'Media',
    fechaLimite: '2026-03-03',
    diasTermino: 15,
    normaAplicable: 'Ley 1755 de 2015 / Protocolo Interno de Atención',
    estado: 'Solucionada y cerrada',
    documentosAdjuntos: [],
    observaciones: 'Se dialogó con el facilitador del curso para ajustar la puntualidad técnica.',
    respuestaEnviada: 'Estimada Diana Marcela, presentamos sinceras excusas. Se reforzó el protocolo con los formadores y se remitió la cartilla completa en PDF y ejemplar impreso.',
    fechaCierre: '2026-02-16',
    solucionDetalle: 'Disculpas formales remitidas, material físico entregado y clase de refuerzo agendada.',
    actividades: [
      { id: 'act-4', fecha: '2026-02-10 10:20', autor: 'Valentina Ospina Vélez', rol: 'Asesor', accion: 'Registro de queja recibida por WhatsApp' },
      { id: 'act-5', fecha: '2026-02-16 11:00', autor: 'Valentina Ospina Vélez', rol: 'Asesor', accion: 'Envío de respuesta formal y entrega de cartilla' }
    ]
  },
  {
    id: 'pqrs-3',
    consecutivo: 'PQRS-2026-003',
    userId: 'usr-4',
    userName: 'Carlos Arturo Quintero Gil',
    userDoc: '98456123',
    userEmail: 'carlos.quintero@servicios.co',
    userPhone: '3189012345',
    fechaRecepcion: '2026-02-15',
    horaRecepcion: '15:40',
    tipo: 'Reclamo',
    descripcion: 'Reporte de inconsistencia en el acta de entrega y recepción a satisfacción de 200 kits escolares facturados con la orden CS-452.',
    canalRecepcion: 'Correo electrónico',
    areaResponsable: 'Proyectos Comunitarios',
    colaboradorAsignado: 'Santiago Morales Pineda',
    prioridad: 'Alta',
    fechaLimite: '2026-03-08',
    diasTermino: 15,
    normaAplicable: 'Ley 1480 de 2011 (Estatuto del Consumidor)',
    estado: 'Solucionada y cerrada',
    documentosAdjuntos: [
      { id: 'adj-2', nombre: 'Factura_CS452_Reclamo.pdf', tamano: '450 KB', tipo: 'application/pdf', fecha: '2026-02-15' }
    ],
    observaciones: 'Se cotejó inventario en bodega central y se corrigió el acta.',
    respuestaEnviada: 'Se emitió acta modificatoria corregida debidamente refrendada por el almacén general y se autorizó el desembolso correspondiente.',
    fechaCierre: '2026-02-22',
    solucionDetalle: 'Acta de recepción corregida y radicada en contabilidad.',
    actividades: [
      { id: 'act-6', fecha: '2026-02-15 15:45', autor: 'Santiago Morales Pineda', rol: 'Gestor de PQRS', accion: 'Radicación por correo electrónico' },
      { id: 'act-7', fecha: '2026-02-22 09:30', autor: 'Santiago Morales Pineda', rol: 'Gestor de PQRS', accion: 'Acta corregida remitida y cierre de caso' }
    ]
  },
  {
    id: 'pqrs-4',
    consecutivo: 'PQRS-2026-004',
    userId: 'usr-2',
    userName: 'Jorge Ignacio Valencia Castro',
    userDoc: '71234980',
    userEmail: 'jorge.valencia@empresa.com',
    userPhone: '3007890123',
    fechaRecepcion: '2026-02-20',
    horaRecepcion: '11:00',
    tipo: 'Felicitación',
    descripcion: 'Agradecimiento especial y exaltación al equipo de brigadistas por la excelente jornada de atención en salud visual realizada en El Poblado.',
    canalRecepcion: 'Llamada telefónica',
    areaResponsable: 'Dirección General',
    colaboradorAsignado: 'Laura Camila Gómez',
    prioridad: 'Baja',
    fechaLimite: '2026-02-27',
    diasTermino: 5,
    normaAplicable: 'Protocolo de Reconocimiento al Colaborador',
    estado: 'Solucionada y cerrada',
    documentosAdjuntos: [],
    observaciones: 'Se compartió la felicitación en la cartelera institucional de la Corporación.',
    respuestaEnviada: 'Apreciado Jorge Ignacio, agradecemos inmensamente su reconocimiento. Transmitimos su mensaje a los brigadistas y coordinadores.',
    fechaCierre: '2026-02-24',
    solucionDetalle: 'Reconocimiento divulgado en reunión de equipo y respuesta de cortesía enviada.',
    actividades: [
      { id: 'act-8', fecha: '2026-02-20 11:10', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Registro de llamada de felicitación' },
      { id: 'act-9', fecha: '2026-02-24 16:00', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Agradecimiento formal enviado' }
    ]
  },
  {
    id: 'pqrs-5',
    consecutivo: 'PQRS-2026-005',
    userId: 'usr-5',
    userName: 'Luz Marina Duque Arango',
    userDoc: '32567123',
    userEmail: 'luz.duque@outlook.com',
    userPhone: '3112345678',
    fechaRecepcion: '2026-02-24',
    horaRecepcion: '09:20',
    tipo: 'Solicitud de información',
    descripcion: 'Petición de información sobre el cronograma y requisitos de acceso al programa de brigadas de optometría comunitaria para personas de la tercera edad.',
    canalRecepcion: 'Página web',
    areaResponsable: 'Servicio al Cliente',
    colaboradorAsignado: 'Valentina Ospina Vélez',
    prioridad: 'Media',
    fechaLimite: '2026-03-09',
    diasTermino: 10,
    normaAplicable: 'Ley 1755 de 2015 - Art. 14, Numeral 2 / Ley 1712 de 2014',
    estado: 'En proceso',
    documentosAdjuntos: [],
    observaciones: 'El cronograma de marzo está siendo consolidado por el área de salud.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-10', fecha: '2026-02-24 09:25', autor: 'Valentina Ospina Vélez', rol: 'Asesor', accion: 'Radicación automática formulario web' },
      { id: 'act-11', fecha: '2026-02-26 14:00', autor: 'Valentina Ospina Vélez', rol: 'Asesor', accion: 'Solicitud de fechas a la coordinación médica' }
    ]
  },
  {
    id: 'pqrs-6',
    consecutivo: 'PQRS-2026-006',
    userId: 'usr-6',
    userName: 'Andrés Felipe Betancur Londoño',
    userDoc: '1017234567',
    userEmail: 'andres.betancur@universidad.edu.co',
    userPhone: '3045678912',
    fechaRecepcion: '2026-02-25',
    horaRecepcion: '16:10',
    tipo: 'Sugerencia',
    descripcion: 'Sugiere implementar un canal de agendamiento de turnos mediante chatbot o mensajes automatizados para evitar filas en la sede presencial.',
    canalRecepcion: 'WhatsApp',
    areaResponsable: 'Servicio al Cliente',
    colaboradorAsignado: 'Laura Camila Gómez',
    prioridad: 'Media',
    fechaLimite: '2026-03-11',
    diasTermino: 10,
    normaAplicable: 'Procedimiento de Mejora Continua PHVA',
    estado: 'En proceso',
    documentosAdjuntos: [],
    observaciones: 'Propuesta incluida en el comité de mejora continua PHVA de marzo.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-12', fecha: '2026-02-25 16:15', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Revisión y envío de propuesta al equipo TI' }
    ]
  },
  {
    id: 'pqrs-7',
    consecutivo: 'PQRS-2026-007',
    userId: 'usr-7',
    userName: 'Gloria Inés Patiño Mendoza',
    userDoc: '43987654',
    userEmail: 'gloria.patino@redsocial.org',
    userPhone: '3109876543',
    fechaRecepcion: '2026-02-26',
    horaRecepcion: '08:45',
    tipo: 'Petición',
    descripcion: 'Solicita expedición de certificado de horas de voluntariado y participación social en el programa de ludotecas infantiles durante 2025.',
    canalRecepcion: 'Correo electrónico',
    areaResponsable: 'Talento Humano',
    colaboradorAsignado: 'Santiago Morales Pineda',
    prioridad: 'Media',
    fechaLimite: '2026-03-12',
    diasTermino: 10,
    normaAplicable: 'Ley 1755 de 2015, Art. 14, Numeral 2',
    estado: 'En espera de información',
    documentosAdjuntos: [],
    observaciones: 'Se solicitó al peticionario confirmar el período exacto de su voluntariado.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-13', fecha: '2026-02-26 08:50', autor: 'Santiago Morales Pineda', rol: 'Gestor de PQRS', accion: 'Requerimiento de documento de identidad' }
    ]
  },
  {
    id: 'pqrs-8',
    consecutivo: 'PQRS-2026-008',
    userId: 'usr-3',
    userName: 'Diana Marcela Cárdenas Rojas',
    userDoc: '52890123',
    userEmail: 'diana.cardenas@gmail.com',
    userPhone: '3156789045',
    fechaRecepcion: '2026-02-27',
    horaRecepcion: '14:20',
    tipo: 'Reclamo',
    descripcion: 'Reporta que en la entrega de subsidio de transporte estudiantil no se le reconoció el abono correspondiente a las semanas 3 y 4 de febrero.',
    canalRecepcion: 'Atención presencial',
    areaResponsable: 'Trabajo Social',
    colaboradorAsignado: 'Laura Camila Gómez',
    prioridad: 'Alta',
    fechaLimite: '2026-03-20',
    diasTermino: 15,
    normaAplicable: 'Ley 1755 de 2015 / Ley 1480 de 2011',
    estado: 'Asignada',
    documentosAdjuntos: [
      { id: 'adj-3', nombre: 'Recibo_Transporte_Suba.pdf', tamano: '310 KB', tipo: 'application/pdf', fecha: '2026-02-27' }
    ],
    observaciones: 'Caso asignado con carácter prioritario para revisión contable.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-14', fecha: '2026-02-27 14:30', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Caso asignado a Trabajo Social' }
    ]
  },
  {
    id: 'pqrs-9',
    consecutivo: 'PQRS-2026-009',
    userId: 'usr-8',
    userName: 'Fundación Huellas de Amor',
    userDoc: '900876543-1',
    userEmail: 'contacto@huellasdeamor.org',
    userPhone: '6044445566',
    fechaRecepcion: '2026-02-28',
    horaRecepcion: '11:15',
    tipo: 'Petición',
    descripcion: 'Petición formal para renovación del convenio de comodato para el uso de la sede comunal en talleres gerontológicos.',
    canalRecepcion: 'Correo electrónico',
    areaResponsable: 'Jurídica',
    colaboradorAsignado: 'Santiago Morales Pineda',
    prioridad: 'Alta',
    fechaLimite: '2026-03-23',
    diasTermino: 15,
    normaAplicable: 'Ley 1755 de 2015, Art. 14 / Art. 32',
    estado: 'Pendiente de asignación',
    documentosAdjuntos: [
      { id: 'adj-4', nombre: 'Propuesta_Renovacion_Convenio.pdf', tamano: '2.4 MB', tipo: 'application/pdf', fecha: '2026-02-28' }
    ],
    observaciones: 'Pendiente de visto bueno por parte del área jurídica corporativa.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-15', fecha: '2026-02-28 11:20', autor: 'Santiago Morales Pineda', rol: 'Gestor de PQRS', accion: 'Recepción y radicación' }
    ]
  },
  {
    id: 'pqrs-10',
    consecutivo: 'PQRS-2026-010',
    userId: 'usr-5',
    userName: 'Luz Marina Duque Arango',
    userDoc: '32567123',
    userEmail: 'luz.duque@outlook.com',
    userPhone: '3112345678',
    fechaRecepcion: '2026-01-15',
    horaRecepcion: '09:00',
    tipo: 'Petición',
    descripcion: 'Solicitud de informe de rendición de cuentas de la Corporación respecto a los fondos recibidos para obras en Manrique.',
    canalRecepcion: 'Página web',
    areaResponsable: 'Dirección General',
    colaboradorAsignado: 'Laura Camila Gómez',
    prioridad: 'Crítica',
    fechaLimite: '2026-01-29', // Overdue case for testing alert!
    diasTermino: 10,
    normaAplicable: 'Ley 1712 de 2014 (Transparencia) / Ley 1755 de 2015',
    estado: 'En proceso',
    documentosAdjuntos: [],
    observaciones: 'ALERTA: Caso con fecha límite excedida pendiente de respuesta por parte de Gerencia.',
    respuestaEnviada: '',
    actividades: [
      { id: 'act-16', fecha: '2026-01-15 09:10', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Radicación de petición de transparencia' },
      { id: 'act-17', fecha: '2026-01-25 16:00', autor: 'Laura Camila Gómez', rol: 'Coordinador', accion: 'Recordatorio enviado a gerencia por vencimiento próximo' }
    ]
  }
];

export const INITIAL_ENCUESTAS: EncuestaSatisfaccion[] = [
  {
    id: 'enc-1',
    pqrsId: 'pqrs-1',
    consecutivoPQRS: 'PQRS-2026-001',
    userId: 'usr-1',
    userName: 'María Elena Salazar Henao',
    calificacion: 5,
    respuestaClara: 'Sí',
    solicitudSolucionada: 'Sí',
    aspectoMejorar: 'Todo fue muy ágil, tal vez ampliar los cupos a más sectores.',
    comentario: 'Excelente disposición de la Corporación Somos Uno, nos sentimos escuchados y respaldados.',
    fecha: '2026-02-19'
  },
  {
    id: 'enc-2',
    pqrsId: 'pqrs-2',
    consecutivoPQRS: 'PQRS-2026-002',
    userId: 'usr-3',
    userName: 'Diana Marcela Cárdenas Rojas',
    calificacion: 4,
    respuestaClara: 'Sí',
    solicitudSolucionada: 'Sí',
    aspectoMejorar: 'Puntualidad en los salones de clase.',
    comentario: 'Me dieron respuesta muy rápido y me entregaron el manual completo.',
    fecha: '2026-02-17'
  },
  {
    id: 'enc-3',
    pqrsId: 'pqrs-3',
    consecutivoPQRS: 'PQRS-2026-003',
    userId: 'usr-4',
    userName: 'Carlos Arturo Quintero Gil',
    calificacion: 5,
    respuestaClara: 'Sí',
    solicitudSolucionada: 'Sí',
    aspectoMejorar: 'Mayor agilidad en bodega para el cotejo de actas.',
    comentario: 'Agradezco la seriedad y prontitud con que solucionaron el reclamo comercial.',
    fecha: '2026-02-23'
  },
  {
    id: 'enc-4',
    pqrsId: 'pqrs-4',
    consecutivoPQRS: 'PQRS-2026-004',
    userId: 'usr-2',
    userName: 'Jorge Ignacio Valencia Castro',
    calificacion: 5,
    respuestaClara: 'Sí',
    solicitudSolucionada: 'Sí',
    aspectoMejorar: 'Ninguno, continúen con esa calidad humana.',
    comentario: 'La corporación demuestra vocación social genuina.',
    fecha: '2026-02-24'
  }
];
