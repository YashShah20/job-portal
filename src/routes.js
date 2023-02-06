import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import Job from './views/Job.vue'
import JobDetails from './views/JobDetails.vue'
import ApplyJob from './views/ApplyJob.vue'
import Profile from './views/Profile.vue'
import Application from './views/Application.vue'
import ApplicationDetails from './views/ApplicationDetails.vue'
import Company from './views/Company.vue'
import CompanyDetails from './views/CompanyDetails.vue'
export default [
    {
        path: '/signin',
        component: SignIn,
        name: 'signin'
    },
    {
        path: '/signup',
        component: SignUp,
        name: 'signup'
    },
    {
        path: '/',
        component: Job,
        name: 'jobs'
    },
    {
        path: '/apply/:job_id',
        component: ApplyJob,
        props:true,
        name: 'job-apply'
    },
    {
        path: '/job/:job_id',
        component: JobDetails,
        name: 'job-details',
        props: true,
    },
    {
        path: '/application',
        component: Application,
        name: 'applications'
    },
    {
        path: '/application/:app_id',
        component: ApplicationDetails,
        props: true,
        name: 'application-details'
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile'
    },
    {
        path: '/company',
        component: Company,
        name: 'company'
    },
    {
        path: '/company/:com_id',
        component: CompanyDetails,
        props: true,
        name: 'company-details'
    },

]