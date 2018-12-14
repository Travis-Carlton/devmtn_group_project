module.exports = {
    getAllUsers: (req,res)=>{
        const db = req.app.get('db');
        db.get_all_users().then(users=>{
            // console.log(res)
            res.status(200).send(users)
        })
    },
    createConversation: (req,res)=>{
        const db = req.app.get('db');
        let {userID,otherUserId} = req.body;
        userID = parseInt(userID);
        otherUserId = parseInt(otherUserId);
        // console.log('user ids ===', userID, otherUserId);
        db.get_conversations().then(response=>{
            console.log(response)
            let match = false
            let matchTwo = false
            let forEach = response.filter(convo=>{
                if(convo.user_id_one === userID || convo.user_id_one === otherUserId){
                    // if(convo.user_id_two === userID || convo.user_id_two === otherUserId){
                    // console.log('object',convo.user_id_one === userID || convo.user_id_two === userID);
                    match = true
                }
                if(convo.user_id_two === userID || convo.user_id_two === otherUserId){
                    // console.log('object', convo.user_id_one === otherUserId || convo.user_id_two === otherUserId);
                    matchTwo = true
                } 
                if(match && matchTwo){
                    return convo
                }
                
            });
            // console.log('>>>>>>',forEach[0])
            // console.log(forEach);
            // console.log(match,matchTwo);
            if(match && matchTwo){
                let msg = 'already have a conversation started';
               return res.status(200).json({convoId: forEach[0].conversation_id, msg})
            } else {
                console.log('help')
                return db.create_new_conversation([userID,otherUserId]).then(newConvo=>{
                    res.status(200).json({convo: newConvo[0]})
                }).catch(err=>console.error(err))
            }
        }).catch(err=>{console.error(err)})
    },
    getPreviousMessages: (req,res)=>{
        const db = req.app.get('db');
        let {conversationid} = req.params;
        conversationid = parseInt(conversationid);
    db.get_conversation_by_cid([conversationid]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.error(err))
    },
    getActiveConversations: (req,res)=>{
        const db = req.app.get('db');
        let {userid} = req.params;
        db.get_active_conversations([parseInt(userid)]).then(response=>{
            // console.log('.....',response);
            let otherUserId = [];
            const mappedOtherusers = response.map(user=>{
                // console.log(user);
                if(user.user_id_one !== parseInt(userid)){
                    // console.log('true1',user.user_id_one);
                    return otherUserId.push(user.user_id_one)
                } else if (user.user_id_two !== parseInt(userid)){
                    // console.log('true2',user.user_id_two);
                    return otherUserId.push(user.user_id_two)  
                }
            })
            const eachProfile = otherUserId.map( otherUser =>{
               const oU = db.get_dev_profile([parseInt(otherUser)]).then(res5 => res5[0])
               return oU
            })
            // console.log('object',eachProfile);
            Promise.all(eachProfile).then(response3=>{
                // console.log('//////',response3);
                res.status(200).send(response3);
            })

        })
    },
}