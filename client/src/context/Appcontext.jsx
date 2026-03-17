import { createContext,useEffect, useState } from "react";
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

            if (data.success){
                setJobs(data.jobs)
                console.log(data.jobs);
            }else{
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

    if (data.success){
        setcompanyData(data.company)
        console.log(data)
    }else {
        toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
    
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
    }

    } catch (error) {
        toast.error(error.message)
        
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

        fetchUserdata
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};