import Blog_home from '@/components/Blog_home'
import Edge_caseStudy from '@/components/Edge_caseStudy'
import Homehero from '@/components/Homehero'
import Homestaff_images from '@/components/Homestaff_images'
import Hometechnology from '@/components/Hometechnology'
import Our_blog from '@/components/Our_blog'
import WhatpeopleSay from '@/components/WhatpeopleSay'
import CaseStudy from '@/components/caseStudy'
// import Jamstack from '.'
       




export default async function page() {
    
    // console.log(projects, "project is here");
        
        return(   
            <>
                <Blog_home />
             <Homehero />
            <CaseStudy />
            <Hometechnology />
            <Edge_caseStudy />
            <WhatpeopleSay />
            <Our_blog />
            <Homestaff_images /> 
            
            </>
        );
}