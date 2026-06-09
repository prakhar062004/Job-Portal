import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppcontextProvider = (props) => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL


    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: "",
    });

    const [isSearched, setIsSearched] = useState(false);

    const [jobs, setJobs] = useState([]);  

    const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [companyToken, setcompanyToken]=useState(null)
    const [companyData, setcompanyData]=useState(null)

    const [userToken, setUserToken] = useState(null)

    const [userData,setUserData]=useState(null)
    const [userApplications,setUserApplications]=useState([])




    // function to fetch jobs

    const fetchJobs = async () => {
        try {
            const {data}=await axios.get(backendUrl+'/api/jobs')

            if (data.success) {
                setJobs(data.jobs)
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }
//function to fetch compant data

const fetchCompanydata= async()=>{
   try {

    const {data} =await axios.get(backendUrl+'/api/company/company',{headers:{token:companyToken}})

    if (data.success) {
        setcompanyData(data.company)
    } else {
        toast.error(data.message)
        if (data.message === "jwt expired" || data.message === "Not authorised login again" || data.message === "Company not found" || data.message === "Company not found, please login again") {
            setcompanyToken(null)
            localStorage.removeItem('companyToken')
            setcompanyData(null)
        }
    }
   } catch (error) {
    toast.error(error.message)
    if (error.response?.data?.message === "jwt expired" || error.response?.data?.message === "Not authorised login again" || error.response?.status === 401 || error.response?.status === 403) {
        setcompanyToken(null)
        localStorage.removeItem('companyToken')
        setcompanyData(null)
    }
   }
}
// function to fetch user data

const fetchUserdata=async ()=>{
    try {

    const {data}= await axios.get(backendUrl+'/api/users/user',
        {headers:{token:userToken}}
    )
    if (data.success){
        setUserData(data.user)
    }else{
        toast.error(data.message)
        if (data.message === "jwt expired" || data.message === "Not authorised login again" || data.message === "User not found" || data.message === "User not found, please login again") {
            setUserToken(null)
            localStorage.removeItem('userToken')
            setUserData(null)
        }
    }

    } catch (error) {
        toast.error(error.message)
        if (error.response?.data?.message === "jwt expired" || error.response?.data?.message === "Not authorised login again" || error.response?.status === 401 || error.response?.status === 403 || error.response?.data?.message === "User not found" || error.response?.data?.message === "User not found, please login again") {
            setUserToken(null)
            localStorage.removeItem('userToken')
            setUserData(null)
        }
    }
}

// function to fetch user applications
const fetchUserApplications = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/users/applications', {
            headers: { token: userToken }
        });
        if (data.success) {
            setUserApplications(data.applications);
        } else {
            toast.error(data.message);
            if (data.message === "jwt expired" || data.message === "Not authorised login again" || data.message === "User not found" || data.message === "User not found, please login again") {
                setUserToken(null);
                localStorage.removeItem('userToken');
                setUserData(null);
            }
        }
    } catch (error) {
        toast.error(error.message);
        if (error.response?.data?.message === "jwt expired" || error.response?.data?.message === "Not authorised login again" || error.response?.status === 401 || error.response?.status === 403) {
            setUserToken(null);
            localStorage.removeItem('userToken');
            setUserData(null);
        }
    }
}

    useEffect(() => {
        fetchJobs()

        const storedCompanytoken= localStorage.getItem('companyToken')

        if (storedCompanytoken){
            setcompanyToken(storedCompanytoken)
        }

        const storedUserToken = localStorage.getItem('userToken')
        if (storedUserToken) {
            setUserToken(storedUserToken)
        }
    },[])

    useEffect(()=>{
        if (companyToken){
            fetchCompanydata()
        }

    },[companyToken])

    useEffect(()=>{
     if (userToken){
        fetchUserdata()
        fetchUserApplications()
     }
    },[userToken])

    

    const value = {
        setSearchFilter,
        searchFilter,

        isSearched,
        setIsSearched,

        jobs,
        setJobs,

        showRecruiterLogin,
        setShowRecruiterLogin,

        showUserLogin,
        setShowUserLogin,

        companyToken,
        setcompanyToken,

        companyData,
        setcompanyData,

        userToken,
        setUserToken,

        backendUrl,

        userData,
        setUserData,

        userApplications,
        setUserApplications,

        fetchUserdata,
        fetchUserApplications
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};