const PROXY_CONFIG=[
    {
        context:[
            '/users',
            '/books'
        ],
        target:'http://localhost:3000',
        secure:false
    }
];

module.exports=PROXY_CONFIG;