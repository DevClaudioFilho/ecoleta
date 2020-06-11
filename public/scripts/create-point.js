function populateUFs(){
  const ufSelect =document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res=> res.json())
  .then(states => {
    for (const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  }) 
}

populateUFs()

function populateCities(event){
  const citySelect =document.querySelector("select[name=city]")
  const stateInput =document.querySelector("input[name=state]")

  const ufID= event.target.value


  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`


  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
  .then(res=> res.json())
  .then(cities => {
    for (const city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled= false
  }) 
}

document
.querySelector("select[name=uf]")
.addEventListener("change",populateCities)




const itemsToCollect = document.querySelectorAll(".items-grind li")

for (const item of itemsToCollect ){
  item.addEventListener("click",handleSelectedItem)
}

let selectedItems = []

const hidenInput = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
  const itemLi = event.target
  
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  const alredySelected = selectedItems.findIndex(item=>item == itemId)

  if(alredySelected >= 0){
    const filteredItems = selectedItems.filter(item=>item !== itemId)

    selectedItems = filteredItems
  }
  else{
    selectedItems.push(itemId)
  }

  console.log(selectedItems)

  hidenInput.value = selectedItems
}
