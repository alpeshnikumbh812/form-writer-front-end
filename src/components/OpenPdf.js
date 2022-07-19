import React, { useState } from "react";
import pdf from '../components/Registration_Form _RI.pdf'
import Image from '../components/ac-opening-individual.jpg';
import '../UI/open_pdf.css'

const OpenPdf = (props) =>{

    // var image =props.profile.profilePdfPath;
    console.log("Check");
    

    // var profileId = props.profile.profileId;
    // const [pageNum,setPageNum] = useState(1);
    
    const getCordinates = (event) =>{

        const x = event.pageX - event.target.offsetLeft;
        const y = event.pageY - event.target.offsetTop;
        console.log(x, y);

        props.XY(x,y);
    }

    
    

    
    // const imagePath = "D:/Projects/form-writer/src/main/resources/assets/images/"+props.profileName.subStr+".jpg";
    // const imagePath = ;
    return(<div className="form">
            <button className="prevBotton" onClick={()=>{props.prevPage(props.page)}} >Prev</button>
            <button className="nextButton" onClick={()=>{props.nextPage(props.page)}}>Next</button>
            <img src={props.imagePath} height="100%" width="100%" alt="form"  onClick={getCordinates}/>
            {/* <img src={require("folder/image.format")} alt="image not found" /> */}
        </div>);
}

export default React.memo(OpenPdf);