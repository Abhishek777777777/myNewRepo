//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';




// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params : {
    //         _limit : 5
    //     }
    // })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err));

    axios
        .get('https://jsonplaceholder.typicode.com/todos?_limit=5', { setTimeout: 5000 })
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
    axios
        .post('https://jsonplaceholder.typicode.com/todos', {
            title: 'New Todo',
            complete: false
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// PUT / PATCH REQUEST
function updateTodo() {
    // axios
    // .put('https://jsonplaceholder.typicode.com/todos/1' ,{
    //     title : 'Updated Todo',
    //     complete : true
    // })
    // .then(res => showOutput(res))
    // .catch(err => console.log(err))
    axios
        .patch('https://jsonplaceholder.typicode.com/todos/1', {
            title: 'Updated Todo',
            complete: true
        })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
    axios
        .delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
        .then(axios.spread((todos, posts) => showOutput(posts)))
        .catch(err => console.log(err))
    // .then(res => {
    //     console.log(res[0]);
    //     console.log(res[1]);
    //     showOutput(res[1]);
    // })
    // .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: 'sometoken'
        }
    };

    axios
        .post('https://jsonplaceholder.typicode.com/todos',
            {
                title: 'New Todo',
                completed: false
            },
            config
        )
        .then(res => showOutput(res))
        .catch(err => console.log(err));
}

//TRANSFORMING REQUEST & RESPONSE
function transformResponse() {
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: { title: 'Hello World' },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();
            return data;
        })
    };
    axios(options).then(res => showOutput(res));
}

//ERROR HANDLING
function errorHandling() {
    axios
        .get('https://jsonplaceholder.typicode.com/todoss' , {
            ValidityState : function(status) {
                return status < 500; // Reject only if status is greater or equal to 500
            }
        })
        .then(res => showOutput(res))
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (err.response.status === 404) {
                    alert('Error: Page not Found');
                }
            }
            else if (err.request) {
                // Request was made but no response
                console.log(err.request)
            }
            else {
                console.log(err.message);
            }
        })
}

//CANCEL TOKEN
function cancelToken() {

    const source = axios.CancelToken.source();


    axios
        .get('https://jsonplaceholder.typicode.com/todos', { cancelToken: source.tolen })
        .then(res => showOutput(res))
        .catch(thrown => {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            }
        });

    if (true) {
        source.cancel('Requst canceles');
    }
}

// // INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
    config => {
        console.log(`${config.method.toUpperCase()} request sent to 
             ${config.url} at ${new Date()}`
        );
        return config
    },
    error => {
        return Promise.reject(error);
    }
)

// AXIOS INSTANCES

const axiosIntance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// axiosIntance.get('/comments').then(res => showOutput(res));


// Show output in broweser
function showOutput(res) {
    document.getElementById("res").innerHTML = `
    <div class='card card-body mb-4'>
    <h5>Status:${res.status}</h5>
    </h5>

    <div class= ""card mt-3">
    <div class= "card-header">
    Headers
    </div>
    <div class="card-body">
    <prev> ${JSON.stringify(res.headers, null, 2)} </prev>
    </div>
   </div>

   <div class="card mt-3">
   <div class="card-header">
     Data
   </div>
   <div class="card-body">
     <pre>${JSON.stringify(res.data, null, 2)}</pre>
   </div>
 </div>

 <div class="card mt-3">
   <div class="card-header">
     Config
   </div>
   <div class="card-body">
     <pre>${JSON.stringify(res.config, null, 2)}</pre>
   </div>
 </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document.getElementById("tranform").addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
