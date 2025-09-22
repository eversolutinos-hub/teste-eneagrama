'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, Clock, Shield, ArrowRight } from 'lucide-react'

// Perguntas do teste de Eneagrama
const questions = [
  {
    id: 1,
    question: "Como você geralmente reage quando as coisas não saem como planejado?",
    options: [
      { text: "Fico irritado e tento corrigir imediatamente", type: 1 },
      { text: "Me sinto desapontado, mas tento ajudar os outros", type: 2 },
      { text: "Foco em encontrar uma solução rápida e eficiente", type: 3 },
      { text: "Reflito sobre o que deu errado e como me sinto", type: 4 },
      { text: "Analiso a situação para entender melhor", type: 5 },
      { text: "Procuro apoio e orientação de outros", type: 6 },
      { text: "Mantenho o otimismo e procuro alternativas", type: 7 },
      { text: "Assumo o controle e tomo decisões firmes", type: 8 },
      { text: "Evito conflitos e procuro manter a paz", type: 9 }
    ]
  },
  {
    id: 2,
    question: "O que mais te motiva no trabalho?",
    options: [
      { text: "Fazer as coisas da maneira certa e com qualidade", type: 1 },
      { text: "Ajudar e apoiar meus colegas", type: 2 },
      { text: "Alcançar metas e ser reconhecido pelo sucesso", type: 3 },
      { text: "Expressar minha criatividade e autenticidade", type: 4 },
      { text: "Aprender e dominar novos conhecimentos", type: 5 },
      { text: "Ter segurança e trabalhar em equipe", type: 6 },
      { text: "Variedade, novos desafios e liberdade", type: 7 },
      { text: "Liderar e ter impacto significativo", type: 8 },
      { text: "Harmonia no ambiente e estabilidade", type: 9 }
    ]
  },
  {
    id: 3,
    question: "Qual é o seu maior medo?",
    options: [
      { text: "Ser imperfeito ou fazer algo errado", type: 1 },
      { text: "Não ser amado ou rejeitado", type: 2 },
      { text: "Ser considerado sem valor ou fracassar", type: 3 },
      { text: "Não ter identidade própria ou ser comum", type: 4 },
      { text: "Ser incompetente ou invadido", type: 5 },
      { text: "Ficar sem apoio ou orientação", type: 6 },
      { text: "Ficar preso ou perder oportunidades", type: 7 },
      { text: "Ser controlado ou vulnerável", type: 8 },
      { text: "Conflitos e separação", type: 9 }
    ]
  },
  {
    id: 4,
    question: "Como você lida com críticas?",
    options: [
      { text: "Fico defensivo, mas uso para melhorar", type: 1 },
      { text: "Me machuco, mas finjo que está tudo bem", type: 2 },
      { text: "Avalio se afeta minha imagem e sucesso", type: 3 },
      { text: "Levo muito a sério e fico emocionalmente abalado", type: 4 },
      { text: "Analiso objetivamente se é válida", type: 5 },
      { text: "Fico ansioso e busco reasseguramento", type: 6 },
      { text: "Tento não levar a sério e mudo de assunto", type: 7 },
      { text: "Posso reagir com raiva se for injusta", type: 8 },
      { text: "Evito confronto e guardo para mim", type: 9 }
    ]
  },
  {
    id: 5,
    question: "Em um grupo, você tende a:",
    options: [
      { text: "Organizar e garantir que tudo seja feito corretamente", type: 1 },
      { text: "Cuidar das necessidades dos outros", type: 2 },
      { text: "Liderar e motivar o grupo para o sucesso", type: 3 },
      { text: "Contribuir com ideias únicas e criativas", type: 4 },
      { text: "Observar e contribuir quando necessário", type: 5 },
      { text: "Ser leal e apoiar as decisões do grupo", type: 6 },
      { text: "Trazer energia e novas possibilidades", type: 7 },
      { text: "Tomar decisões difíceis e proteger o grupo", type: 8 },
      { text: "Mediar conflitos e manter a harmonia", type: 9 }
    ]
  },
  {
    id: 6,
    question: "Quando você está estressado, você:",
    options: [
      { text: "Fico mais crítico e perfeccionista", type: 1 },
      { text: "Me torno mais controlador e manipulativo", type: 2 },
      { text: "Trabalho compulsivamente e ignoro sentimentos", type: 3 },
      { text: "Me isolo e fico mais melancólico", type: 4 },
      { text: "Me retiro e evito pessoas", type: 5 },
      { text: "Fico mais ansioso e busco mais segurança", type: 6 },
      { text: "Me torno impaciente e disperso", type: 7 },
      { text: "Fico mais confrontativo e dominador", type: 8 },
      { text: "Procrastino e evito decisões", type: 9 }
    ]
  },
  {
    id: 7,
    question: "O que você mais valoriza em relacionamentos?",
    options: [
      { text: "Honestidade e integridade", type: 1 },
      { text: "Cuidado mútuo e apoio emocional", type: 2 },
      { text: "Admiração e sucesso compartilhado", type: 3 },
      { text: "Conexão profunda e autenticidade", type: 4 },
      { text: "Respeito ao espaço pessoal e independência", type: 5 },
      { text: "Lealdade e confiança", type: 6 },
      { text: "Diversão e aventuras juntos", type: 7 },
      { text: "Honestidade direta e proteção mútua", type: 8 },
      { text: "Paz, aceitação e harmonia", type: 9 }
    ]
  },
  {
    id: 8,
    question: "Sua abordagem para tomar decisões é:",
    options: [
      { text: "Analiso cuidadosamente o que é certo", type: 1 },
      { text: "Considero como afetará os outros", type: 2 },
      { text: "Escolho o que me levará ao sucesso", type: 3 },
      { text: "Sigo minha intuição e sentimentos", type: 4 },
      { text: "Coleto informações e analiso objetivamente", type: 5 },
      { text: "Busco conselhos e considero os riscos", type: 6 },
      { text: "Mantenho opções abertas e escolho o mais interessante", type: 7 },
      { text: "Decido rapidamente baseado na minha experiência", type: 8 },
      { text: "Evito decisões difíceis ou sigo o que outros querem", type: 9 }
    ]
  },
  {
    id: 9,
    question: "Como você se vê?",
    options: [
      { text: "Responsável, organizado e com altos padrões", type: 1 },
      { text: "Prestativo, carinhoso e focado nos outros", type: 2 },
      { text: "Ambicioso, eficiente e orientado para resultados", type: 3 },
      { text: "Único, sensível e autêntico", type: 4 },
      { text: "Observador, independente e competente", type: 5 },
      { text: "Leal, responsável e cauteloso", type: 6 },
      { text: "Entusiasta, versátil e otimista", type: 7 },
      { text: "Forte, direto e protetor", type: 8 },
      { text: "Pacífico, adaptável e estável", type: 9 }
    ]
  },
  {
    id: 10,
    question: "O que mais te incomoda nos outros?",
    options: [
      { text: "Irresponsabilidade e falta de padrões", type: 1 },
      { text: "Egoísmo e falta de consideração", type: 2 },
      { text: "Preguiça e falta de ambição", type: 3 },
      { text: "Superficialidade e falta de autenticidade", type: 4 },
      { text: "Invasão de privacidade e incompetência", type: 5 },
      { text: "Deslealdade e imprevisibilidade", type: 6 },
      { text: "Negatividade e limitações", type: 7 },
      { text: "Fraqueza e desonestidade", type: 8 },
      { text: "Conflitos e pressão", type: 9 }
    ]
  }
]

// Descrições dos tipos de Eneagrama
const enneagramTypes = {
  1: {
    name: "O Perfeccionista",
    description: "Racional, idealista, com princípios, determinado, controlado e perfeccionista.",
    traits: ["Organizado", "Responsável", "Crítico", "Detalhista", "Ético"],
    motivation: "Ser bom, certo, perfeito e melhorar tudo",
    fear: "Ser corrupto, defeituoso ou errado",
    color: "from-red-500 to-red-600"
  },
  2: {
    name: "O Prestativo",
    description: "Carinhoso, interpessoal, demonstrativo, generoso, possessivo e manipulativo.",
    traits: ["Empático", "Generoso", "Carinhoso", "Prestativo", "Emocional"],
    motivation: "Sentir-se amado e necessário",
    fear: "Ser rejeitado ou não amado",
    color: "from-pink-500 to-pink-600"
  },
  3: {
    name: "O Realizador",
    description: "Adaptável, ambicioso, orientado para o sucesso, consciente da imagem e pragmático.",
    traits: ["Ambicioso", "Eficiente", "Adaptável", "Competitivo", "Carismático"],
    motivation: "Sentir-se valioso e aceito",
    fear: "Ser sem valor ou sem mérito",
    color: "from-yellow-500 to-yellow-600"
  },
  4: {
    name: "O Individualista",
    description: "Expressivo, dramático, egocêntrico, temperamental e criativo.",
    traits: ["Criativo", "Sensível", "Introspectivo", "Único", "Melancólico"],
    motivation: "Encontrar a si mesmo e seu significado",
    fear: "Não ter identidade ou significado pessoal",
    color: "from-purple-500 to-purple-600"
  },
  5: {
    name: "O Investigador",
    description: "Intenso, cerebral, perceptivo, inovador, reservado e isolado.",
    traits: ["Observador", "Independente", "Analítico", "Reservado", "Competente"],
    motivation: "Ser capaz e compreender o mundo",
    fear: "Ser invadido ou incompetente",
    color: "from-green-500 to-green-600"
  },
  6: {
    name: "O Leal",
    description: "Comprometido, responsável, ansioso, desconfiado, cauteloso e indeciso.",
    traits: ["Leal", "Responsável", "Ansioso", "Cauteloso", "Cooperativo"],
    motivation: "Ter segurança e apoio",
    fear: "Ficar sem apoio ou orientação",
    color: "from-blue-500 to-blue-600"
  },
  7: {
    name: "O Entusiasta",
    description: "Espontâneo, versátil, distraído, disperso, indisciplinado e impulsivo.",
    traits: ["Otimista", "Versátil", "Espontâneo", "Entusiasta", "Aventureiro"],
    motivation: "Manter-se feliz e satisfeito",
    fear: "Ficar preso na dor ou privação",
    color: "from-orange-500 to-orange-600"
  },
  8: {
    name: "O Desafiador",
    description: "Autoconfiante, decidido, obstinado, confrontativo e controlador.",
    traits: ["Forte", "Direto", "Protetor", "Decidido", "Controlador"],
    motivation: "Ser autossuficiente e controlar seu destino",
    fear: "Ser controlado ou vulnerável",
    color: "from-gray-700 to-gray-800"
  },
  9: {
    name: "O Pacificador",
    description: "Receptivo, tranquilizador, agradável, complacente e resignado.",
    traits: ["Pacífico", "Receptivo", "Estável", "Harmonioso", "Adaptável"],
    motivation: "Manter a paz e harmonia interior e exterior",
    fear: "Perda de conexão e fragmentação",
    color: "from-teal-500 to-teal-600"
  }
}

export default function EneagramaInsights() {
  const [currentStep, setCurrentStep] = useState('landing') // landing, test, payment, result
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<number | null>(null)
  const [showPayment, setShowPayment] = useState(false)

  const handleStartTest = () => {
    setCurrentStep('test')
  }

  const handleAnswer = (typeValue: number) => {
    const newAnswers = [...answers, typeValue]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calcular resultado
      const typeCounts = newAnswers.reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {} as Record<number, number>)

      const dominantType = Object.entries(typeCounts).reduce((a, b) => 
        typeCounts[parseInt(a[0])] > typeCounts[parseInt(b[0])] ? a : b
      )[0]

      setResult(parseInt(dominantType))
      setCurrentStep('payment')
    }
  }

  const handlePayment = () => {
    // Simular pagamento aprovado
    setCurrentStep('result')
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Eneagrama Insights
                </h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="w-4 h-4 mr-1" />
                100% Seguro
              </Badge>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
              <Star className="w-4 h-4 mr-1" />
              Teste Oficial de Personalidade
            </Badge>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Descubra Seu
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                Tipo de Personalidade
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Teste completo baseado no Eneagrama com análise profunda da sua personalidade. 
              Descubra seus padrões comportamentais, motivações e como se relaciona com o mundo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                <span>10 minutos</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2 text-indigo-600" />
                <span>+50.000 pessoas testadas</span>
              </div>
              <div className="flex items-center text-gray-600">
                <CheckCircle className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Resultado imediato</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">R$ 9,90</div>
                <p className="text-gray-600">Pagamento único • Acesso imediato</p>
              </div>
              
              <Button 
                onClick={handleStartTest}
                size="lg" 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Iniciar Teste Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                ✓ Análise completa da personalidade • ✓ Relatório detalhado • ✓ Dicas de desenvolvimento
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              O que você vai descobrir
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Seu Tipo de Personalidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Identifique qual dos 9 tipos do Eneagrama representa sua personalidade única
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Motivações Profundas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Entenda o que realmente te motiva e quais são seus medos fundamentais
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Plano de Desenvolvimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Receba dicas personalizadas para seu crescimento pessoal e profissional
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (currentStep === 'test') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(progress)}% concluído
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start p-4 h-auto hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                  onClick={() => handleAnswer(option.type)}
                >
                  <span className="text-wrap">{option.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-8">
            <CardHeader>
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl mb-4">Teste Concluído!</CardTitle>
              <CardDescription className="text-lg">
                Seu resultado está pronto. Faça o pagamento para acessar sua análise completa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="text-3xl font-bold text-indigo-600 mb-2">R$ 9,90</div>
                <p className="text-gray-600 mb-4">Pagamento único • Acesso imediato</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <div>✓ Análise completa da sua personalidade</div>
                  <div>✓ Relatório detalhado com características</div>
                  <div>✓ Dicas personalizadas de desenvolvimento</div>
                  <div>✓ Acesso imediato ao resultado</div>
                </div>
              </div>
              
              <Button 
                onClick={handlePayment}
                size="lg" 
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Pagar e Ver Resultado
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-xs text-gray-500 mt-4">
                Pagamento 100% seguro • Processamento instantâneo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === 'result' && result) {
    const resultType = enneagramTypes[result as keyof typeof enneagramTypes]
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              Resultado Completo
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Seu Tipo de Personalidade
            </h1>
            <p className="text-xl text-gray-600">
              Baseado nas suas respostas, aqui está sua análise completa
            </p>
          </div>

          {/* Result Card */}
          <Card className="mb-8 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${resultType.color}`}></div>
            <CardHeader className="text-center pb-4">
              <div className={`w-24 h-24 bg-gradient-to-r ${resultType.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-3xl font-bold text-white">{result}</span>
              </div>
              <CardTitle className="text-3xl mb-2">{resultType.name}</CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                {resultType.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-indigo-600" />
                  Características Principais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resultType.traits.map((trait, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Motivação Central
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{resultType.motivation}</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-red-600 mb-2">Medo Básico:</h4>
                  <p className="text-gray-700">{resultType.fear}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Development Tips */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Dicas de Desenvolvimento Pessoal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Para Crescer:</h4>
                  <p className="text-green-700">
                    Trabalhe na consciência dos seus padrões automáticos e pratique a flexibilidade em suas reações habituais.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Nos Relacionamentos:</h4>
                  <p className="text-blue-700">
                    Comunique suas necessidades de forma clara e pratique a empatia para entender diferentes perspectivas.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">No Trabalho:</h4>
                  <p className="text-purple-700">
                    Use seus pontos fortes naturais enquanto desenvolve habilidades complementares para uma performance mais equilibrada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="text-center bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Parabéns por conhecer melhor sua personalidade!
              </h3>
              <p className="text-gray-600 mb-6">
                Continue sua jornada de autoconhecimento aplicando essas descobertas no seu dia a dia.
              </p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Fazer Novo Teste
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}