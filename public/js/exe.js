console.log('Client side JavaScript is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent = ''
    
    
    fetch(' /weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else{
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

        if(search.value === 'Vadodara' || search.value === 'vadodara'){
            messageThree.textContent = 'Sucks to be you :*'
        }
        else{
            messageThree.textContent = ''
        }
        
    })
    
})
})