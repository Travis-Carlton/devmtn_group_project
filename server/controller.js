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
        const { user_id, title, overview, hourly_rate, portfolio, skills, education, profile_picture, developer_email } = req.body;
        db.create_dev_profile(user_id, title, overview, hourly_rate, portfolio, skills, education, profile_picture, developer_email)
        .then(profile => {
            res.status(200).json(profile)
        }).catch(error => {
            console.error('Error on createDevProfile', error)
        })
    },
    viewDevProfile: (req, res) => {
        const db = req.app.get('db');
        const { id } = req.params;
        db.get_dev_profile(id)
        .then(profile => {
            res.status(200).json(profile)
        }).catch(error => {
            console.error('Error on viewDevProfile', error)
        })
    },
    createJob: (req, res) => {
        console.log(req.body)
        const db = req.app.get('db');
        const { client_id, title, description, start_date, estimation, pay, job_email } = req.body;
        db.create_job(client_id, title, description, start_date, estimation, pay, job_email)
        .then(job => {
            console.log(job)
            res.status(200).json(job)
        }).catch(error => {
            console.error('Error on createJob', error)
        })
    },
    viewAllJobs: (req, res) => {
        const db = req.app.get('db');
        db.get_all_jobs()
        .then(jobs => {
            console.log(jobs)
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
    }
}