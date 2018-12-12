module.exports = {
    isDeveloper: (req, res) => {
        const db = req.app.get('db');
        const { developer, id } = req.body;
        db.is_developer(id, developer)
        .then(user => {
            res.status(200).json(user)
        }).catch(error => {
            console.error('Error on isDeveloper', error)
        })
    },
    createDevProfile: (req, res) => {
        const db = req.app.get('db');
        const { userID, name, title, overview, hourly_rate, portfolio, skills, education} = req.body;
        req.session.user.title = title;
        req.session.user.overview = overview;
        req.session.user.hourly_rate = hourly_rate;
        req.session.user.portfolio = portfolio;
        req.session.user.skills = skills;
        req.session.user.education = education;
        db.create_dev_profile(userID, name, title, overview, hourly_rate, portfolio, skills, education)
        .then(profile => {
            res.status(200).json(profile)
        }).catch(error => {
            console.error('Error on createDevProfile', error)
        })
    },
    viewDevProfile: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        id = parseInt(id);
        db.get_dev_profile([id])
        .then(profile => {
            res.status(200).json(profile[0])
        }).catch(error => {
            console.error('Error on viewDevProfile', error)
        })
    },
    createJob: (req, res) => {
        const db = req.app.get('db');
        const { client_id, title, description, start_date, estimation, pay, job_email } = req.body;
        db.create_job(client_id, title, description, start_date, estimation, pay, job_email)
        .then(job => {
            res.status(200).json(job)
        }).catch(error => {
            console.error('Error on createJob', error)
        })
    },
    viewAllJobs: (req, res) => {
        const db = req.app.get('db');
        db.get_all_jobs()
        .then(jobs => {
            res.status(200).json(jobs)
        }).catch(error => {
            console.error('Error on viewAllJobs', error)
        })
    },
    viewSelectedJob: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_selected_job(id)
        .then(job => {
            res.status(200).json(job)
        }).catch(error => {
            console.error('Error on viewSelectedJob', error)
        })
    },
    addFavorite: (req, res) => {
        const db = req.app.get('db');
        const {user_id, job_id} = req.body;
        db.add_favorite([user_id, job_id]).then(fav => {
            res.status(200).json(fav)
        }).catch(error => {
            console.error('Error on addFavorite', error)
        })
    },
    getFavorites: (req, res) => {
        const db = req.app.get('db');
        let {id} = req.params;
        id = parseInt(id)
        db.get_favorites(id)
        .then(fav => {
            console.log(fav)
            res.status(200).json(fav)
        }).catch(error => {
            console.error('Error on getFavorites', error)
        })
    },
    getAllDevelopers: (req, res) => {
        const db = req.app.get('db');
        db.get_all_developers()
        .then(developer => {
            res.status(200).json(developer)
        }).catch(error => {
            console.error('Error on getAllDevelopers', error)
        })
    },
    changeStatus: (req, res) => {
        const db = req.app.get('db');
        const {status, job_id} = req.body;
        db.change_status(status, job_id).then(status => {
            res.status(200).json(status)
        })
    },
    accepted: (req, res) => {
        const db = req.app.get('db');
        const {user_id, job_id} = req.body;
        db.add_accepted([user_id, job_id]).then(job => {
            res.status(200).json(job)
        })
    },
    applied: (req, res) => {
        const db = req.app.get('db');
        const {user_id, job_id} = req.body;
        db.add_applied(job_id, user_id).then(applied => {
            res.status(200).json(applied)
        })
    },
    getJobsPosted: (req, res) => {
        const db = req.app.get('db');
        const {userID} = req.params;
        db.get_jobs_posted(userID)
        .then(job => {
            res.status(200).json(job)
        })
        .catch(error => {
            console.error('Error on getJobsPosted', error)
        })
    },
    getApplied: (req, res) => {
        const db = req.app.get('db');
        const {jobID} = req.params;
        db.get_applied(jobID)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.error('Error on getApplied', error)
        })
    },
    uploadProfile: (req, res) => {
        const db = req.app.get('db')
        const {profile_picture, user_id} = req.body
        req.session.user.profile_picture = profile_picture;
        db.upload_profile_picture([profile_picture, user_id]).then(response => {
            res.status(200).json(response)
            console.log(response)
        }).catch(error => {
            console.error('Error on uploadProfile', error)
        })
    }
}