
let participantes = [
  {
    nome: "Mayky Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 3, 01, 18, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0)
  },
  {
    nome: "Diogo Fernandes",
    email: "diogo@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 15, 0)
  },
  {
    nome: "Ana Oliveira",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 14, 30),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 10),
    dataCheckIn: new Date(2024, 2, 24, 16, 30)
  },
  {
    nome: "Maria Santos",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 21, 0),
    dataCheckIn: null
  },
  {
    nome: "Pedro Costa",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 21, 19, 45),
    dataCheckIn: new Date(2024, 2, 25, 17, 20)
  },
  {
    nome: "Carla Santos",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 16, 10),
    dataCheckIn: null
  },
  {
    nome: "Rafaela Lima",
    email: "rafaela@gmail.com",
    dataInscricao: new Date(2024, 2, 19, 12, 20),
    dataCheckIn: new Date(2024, 2, 26, 11, 30)
  },
  {
    nome: "Marcos Oliveira",
    email: "marcos@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 9, 0),
    dataCheckIn: null
  },
  {
    nome: "Luana Costa",
    email: "luana@gmail.com",
    dataInscricao: new Date(2024, 2, 20, 17, 30),
    dataCheckIn: new Date(2024, 2, 25, 10, 10)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
    data-email="${participante.email}"
    onclick = "fazerCheckIn(event)" >
      Confirmar check-in
    </button>`
  }


  return `  
    <tr>
        <td>
          <strong> 
          ${participante.nome}
          </strong>
          <br>
          <small>
          ${participante.email}
          </small>
        </td>
        <td>
       ${dataInscricao}
        </td>
        <td>
        ${dataCheckIn}
        </td>
      </tr>
      `
}

const atualizarLista = (participantes) => {

  let output = ""
  //estrutura de repetição

  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)

  }

  document.querySelector('tbody').innerHTML = output

}

atualizarLista(participantes);

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante já existe

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formmulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer fazer CheckIn
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o Check-In?'

  if (confirm(mensagemConfirmacao) == false) {
    return
  }


  //encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  //atualizar o checkin do participante 
  participante.dataCheckIn = new Date()
  //atualizar a lista de participaentes com a nova data
  atualizarLista(participantes)
}