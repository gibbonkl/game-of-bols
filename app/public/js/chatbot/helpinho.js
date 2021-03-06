var initial_message = {
    activities: [
        {
            type: "message",
            attachmentLayout: "list",
            attachments: [
                {
                    content: {
                        type: "AdaptiveCard",
                        "body": [
                            {
                                "type": "Image",
                                "altText": "Helpinho",
                                "url": "https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif",
                                "size": "Large",
                                "horizontalAlignment": "Center"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "Olá! Eu sou o Helpinho, assistente virtual do Game Of Bols."
                                    }
                                ],
                                "horizontalAlignment": "Center",
                                "height": "stretch"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "Comigo você pode buscar DailyNotes, postagens no nosso HelpCenter ou tirar dúvidas sobre a plataforma!"
                                    }
                                ],
                                "horizontalAlignment": "Center",
                                "height": "stretch"
                            },
                            {
                                "type": "RichTextBlock",
                                "inlines": [
                                    {
                                        "type": "TextRun",
                                        "text": "No que posso ajudar?"
                                    }
                                ],
                                "height": "stretch",
                                "horizontalAlignment": "Center"
                            }
                        ],
                        type: "AdaptiveCard",
                        version: "1.0",
                    },
                    contentType: "application/vnd.microsoft.card.adaptive",
                }
            ],
            from: {
                id: 'helpinho-bot',
                name: 'helpinho-bot',
                role: 'bot'
            },
            timestamp: new Date()
        }
    ]
}
const user = $("#webchat").attr("data-user")
function loadStore(){
    let reduxStore = window.sessionStorage.getItem('HELPINHO_REDUX') ? window.sessionStorage.getItem('HELPINHO_REDUX') : JSON.stringify(initial_message);
    if (reduxStore == JSON.stringify(initial_message)){
        window.sessionStorage.setItem('HELPINHO_REDUX', reduxStore)
    }

    return JSON.parse(reduxStore);
}

function updateStore(activity){
    //console.log(activity.text)
    let reduxStore = window.sessionStorage.getItem('HELPINHO_REDUX');
    reduxStore = JSON.parse(reduxStore);
    reduxStore['activities'].push(activity)
    window.sessionStorage.setItem('HELPINHO_REDUX', JSON.stringify(reduxStore));
}

function checkEmptyStore(){
    let reduxStore = window.sessionStorage.getItem('HELPINHO_REDUX');
    reduxStore = JSON.parse(reduxStore);
    if (reduxStore['activities'].length > 0)
        return false
    return true
}

var store = window.WebChat.createStore(
    loadStore(),
    ({ dispatch }) => next => action => {

        // save conversations in sessionstorage       
        if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
            //console.log(action)
            let activity = action.payload.activity
            if (activity.type === 'message') {
                console.log(activity)
                action.payload.activity.timestamp = new Date();
                //activity.from.name = user;
                updateStore(activity)
            }
        }

    return next(action);
    }
);

var styleOptions = {
    botAvatarImage: 'https://docs.microsoft.com/en-us/azure/bot-service/v4sdk/media/logo_bot.svg?view=azure-bot-service-4.0',
    botAvatarInitials: 'HP',
    userAvatarImage: 'https://s3.amazonaws.com/gupy5/production/companies/417/career/410/images/logo.jpg',
    userAvatarInitials: 'US'
};

window.WebChat.renderWebChat({
    directLine: window.WebChat.createDirectLine({ token: 'h2YdnybwvH8.gyFcH-kaH4CsG0O2b5BGyeE88AJTS-sEdIRb3DAuux8' }),
    userID: user,
    username: user, 
    store,
    styleOptions
}, document.getElementById('webchat'));

document.querySelector('#webchat > *').focus();