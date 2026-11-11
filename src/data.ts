// Todo o conteúdo pessoal do site fica aqui. Para atualizar o portfólio, edite só este arquivo.
// Fonte: CV_Matheus_Beiruth_FullStack_2026.pdf

const whatsappText = encodeURIComponent('Olá, Matheus! Vim pelo seu portfólio.')

export const profile = {
  name: 'Matheus Beiruth',
  firstName: 'Matheus',
  role: 'Desenvolvedor full-stack',
  stackLine: 'React Native · TypeScript · Python · Java',
  status: 'Buscando estágio ou vaga júnior',
  location: 'Maricá, Rio de Janeiro',
  focus: 'Apps mobile · APIs · sistemas web',
  photo: 'img/perfil.png',
  resume: 'files/CV_Matheus_Beiruth_FullStack_2026.pdf',
  email: 'matheusbeiruth10@gmail.com',
  links: {
    github: 'https://github.com/BeiruthDEV',
    linkedin: 'https://www.linkedin.com/in/matheusbeiruth/',
    whatsapp: `https://wa.me/5521985217283?text=${whatsappText}`,
  },
}

export type Project = {
  slug: string
  name: string
  category: string
  description: string
  tags: string[]
  /** Print do projeto. Sem imagem, o card mostra o `diagram`. */
  image?: string
  /** Etapas de um fluxo, exibidas no lugar da imagem. */
  diagram?: string[]
  url: string
  urlLabel: string
}

export const projects: Project[] = [
  {
    slug: 'gestao-ativa',
    name: 'Gestão Ativa',
    category: 'SaaS · Inteligência financeira',
    description: 'Zeno: o usuário envia o extrato bancário e o app categoriza as transações, detecta despesas recorrentes e gera um diagnóstico financeiro.',
    tags: ['Next.js', 'TypeScript', 'FastAPI', 'Pandas'],
    image: 'img/projects/gestao-ativa.webp',
    url: 'https://gestao-ativa.netlify.app/',
    urlLabel: 'gestao-ativa.netlify.app',
  },
  {
    slug: 'stayon',
    name: 'StayOn',
    category: 'Mobile · Produtividade',
    description: 'App Android offline e sem conta: tarefas, hábitos, agenda em blocos e sessões de foco que bloqueiam os apps escolhidos, com módulo nativo em Kotlin.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Kotlin'],
    image: 'img/projects/stayon.webp',
    url: 'https://github.com/BeiruthDEV/StayOn',
    urlLabel: 'github.com/BeiruthDEV/StayOn',
  },
  {
    slug: 'roadly',
    name: 'Roadly',
    category: 'Produto · Web e Desktop',
    description: 'Gerenciador de projetos, issues e planejamento de software, inspirado no Linear e no Trello.',
    tags: ['React', 'TypeScript', 'Electron'],
    image: 'img/projects/roadly.webp',
    url: 'https://github.com/BeiruthDEV/Roadly-demo',
    urlLabel: 'github.com/BeiruthDEV/Roadly-demo',
  },
  {
    slug: 'caio-links',
    name: 'Caio Rino · Links',
    category: 'Frontend · Link na bio',
    description: 'Página de links para a bio do Instagram do atleta Caio Rino, com parcerias e cupons.',
    tags: ['Frontend', 'Link na bio', 'Netlify'],
    image: 'img/projects/caio-links.webp',
    url: 'https://caio-links.netlify.app/',
    urlLabel: 'caio-links.netlify.app',
  },
  {
    slug: 'taskmanager-api',
    name: 'Trackio',
    category: 'Backend · API',
    description: 'API de gestão de tarefas (TaskManagerAPI) em monólito modular, com Kanban, dashboard, 55 testes e deploy na Railway.',
    tags: ['Java', 'Spring Boot', 'Docker', 'Cucumber'],
    image: 'img/projects/trackio.webp',
    url: 'https://github.com/BeiruthDEV/TaskManagerAPI',
    urlLabel: 'github.com/BeiruthDEV/TaskManagerAPI',
  },
  {
    slug: 'transflow',
    name: 'TransFlow',
    category: 'Backend · Eventos',
    description: 'API de mobilidade orientada a eventos: registra corridas, publica no RabbitMQ e um worker atualiza o saldo do motorista de forma atômica no Redis.',
    tags: ['FastAPI', 'MongoDB', 'RabbitMQ', 'Redis'],
    diagram: ['API', 'MongoDB', 'RabbitMQ', 'worker', 'Redis'],
    url: 'https://github.com/BeiruthDEV/transflow-backend',
    urlLabel: 'github.com/BeiruthDEV/transflow-backend',
  },
  {
    slug: 'express-jwt-docker-api',
    name: 'express-jwt-docker-api',
    category: 'Full stack · API',
    description: 'Gestão de estoque com autenticação JWT e ambiente containerizado.',
    tags: ['Node.js', 'React', 'Docker'],
    image: 'img/projects/inventory.webp',
    url: 'https://github.com/BeiruthDEV/express-jwt-docker-api',
    urlLabel: 'github.com/BeiruthDEV/express-jwt-docker-api',
  },
  {
    slug: 'orbia',
    name: 'Orbia',
    category: 'Plataforma acadêmica · Equipe',
    description: 'Feita em equipe: fui o frontend e também cuidei de autenticação, upload de mídia, controle de acesso por papel, dashboard e geolocalização de empresas.',
    tags: ['Django', 'PostgreSQL', 'geopy'],
    image: 'img/projects/orbia.webp',
    url: 'https://github.com/BeiruthDEV/Orbia',
    urlLabel: 'github.com/BeiruthDEV/Orbia',
  },
  {
    slug: 'matheusbeiruth',
    name: 'matheusbeiruth.com.br',
    category: 'Site profissional',
    description: 'Site profissional para apresentar meu trabalho, links e projetos em destaque.',
    tags: ['Portfólio', 'Frontend'],
    image: 'img/projects/matheusbeiruth.webp',
    url: 'https://matheusbeiruth.com.br/',
    urlLabel: 'matheusbeiruth.com.br',
  },
]

export type Step = { title: string; detail: string; period: string; bullets?: string[] }

export const journey: Step[] = [
  {
    title: 'Desenvolvedor Full-Stack (Estágio)',
    detail: 'Plataforma de Comunidade Digital · Maricá, RJ',
    period: 'Abr — Jul 2026',
    bullets: [
      'Estruturei a camada de dados e o controle de acesso no Supabase/PostgreSQL para 7+ módulos: autenticação, perfis, eventos, rankings, assinaturas, feed de comunidade e mesas virtuais de jogos.',
      'Implementei autenticação e controle de permissões por papéis (gratuito, premium e admin), gerenciando regras de acesso a dados entre múltiplos módulos e tipos de usuário.',
      'Construí listagens paginadas de eventos, comparação dinâmica de planos, chat em tempo real e sistema de ranking, integrados ao app em React Native.',
      'Trabalhei em equipe de 2 desenvolvedores full-stack, com autonomia para decisões arquiteturais e implementação de features end-to-end, aplicando princípios SOLID.',
    ],
  },
  {
    title: 'Atendente Comercial e Operacional',
    detail: 'Onshop.dmo · Maricá, RJ',
    period: 'Ago 2024 — Jan 2025',
    bullets: [
      'Gerenciei o inventário de 200+ produtos de uma plataforma de e-commerce, mantendo os registros precisos e o estoque organizado.',
      'Processei pedidos e resolvi demandas pós-venda; padronizei processos operacionais, reduzindo erros recorrentes.',
    ],
  },
  { title: 'Projetos independentes de software', detail: 'Apps mobile, APIs backend e dashboards', period: '2024 — atual' },
  { title: 'Prefeitura de Maricá · Freelancer temporário', detail: 'Apoio em eventos e supervisão operacional', period: '2023 — 2024' },
  { title: 'Engenharia de Software', detail: 'Universidade de Vassouras · conclusão prevista em julho de 2027', period: '2022 — 2027' },
]

export const certificates = [
  {
    title: 'Back-End Python',
    issuer: 'Bolsa Futuro Digital (Softex)',
    year: '2025',
    detail: 'Formação de 6 meses em back-end com Python e Django.',
    image: 'img/certificados/backend-thumb.png',
    file: 'files/Certificado_Back_End.pdf',
  },
  {
    title: 'Estruturas de Dados e Algoritmos',
    issuer: 'Augusto Galego',
    year: '2025',
    detail: 'Curso livre com carga horária total de 8 horas.',
    image: 'img/certificados/algoritmos-thumb.png',
    file: 'files/certificado-algoritmos.pdf',
  },
  {
    title: 'Curso Completo de MySQL',
    issuer: 'Curso em Vídeo',
    year: '2025',
    detail: 'Curso concluído com duração total de 40 horas.',
    image: 'img/certificados/mysql-thumb.png',
    file: 'files/certificado-mysql.pdf',
  },
]
