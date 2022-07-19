import React, { useState, useEffect, Fragment } from "react";
import OpenPdf from "./OpenPdf";
import Controls from "./Controls";
import "../UI/container.css";
import ProfileList from "./ProfileList";
import CreateProfileForm from "./CreateProfileForm";
import GenerateForm from "./GenerateForm";

const Container = () => {
  let num = Math.random(1000*100+20);
  const [page, setPage] = useState(1);
  const [profileId, setProfileId] = useState(0);
  const [reloadPage, setReloadPage] = useState(true);
  const [profile, setProfile] = useState();
  const [imagePath,setImagePath] = useState("http://localhost:8080/form-writer/get-image-url/"+ profileId +"/"+page+"/"+1)
  const [pdfVisible, setPdfVisible] = useState(false);
  const [generateVisible, setGenerateVisible] = useState(false);
  const [addProfile, setAddProfilre] = useState(false);
  const [profiles, setProfiles] = useState([]);
  
  const [controls, setControls] = useState({
    cntl: [],
    selectedIndex: 0,
  });

 
  // const [gapDisable, setGapDisable] = useState("none");

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8080/form-filling/profile/get-list")
      .then((response) => response.json())
      .then((data) => setProfiles(data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [addProfile]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    let newCntl = { ...controls };
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:8080/profile-details/get-list/" + profileId)
      .then((response) => response.json())
      .then((data) => {
        newCntl.cntl = data;
        setControls(newCntl);
      });

    console.log("new cntl ", controls);

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [pdfVisible, generateVisible]);

  const rowClickHandler = (id) => {
    console.log("id ", id);

    var newCntl = { ...controls };
    newCntl.selectedIndex = id;
    setControls(newCntl);
  };

  const setXYCordinates = (x, y) => {
    var selectedIndex = controls.selectedIndex;
    var newCntl = { ...controls };
    newCntl.cntl[selectedIndex].x = x;
    newCntl.cntl[selectedIndex].y = y;

    setControls(newCntl);
  };

  const manageControls = (noOfControls) => {
    console.log("Profile Id " + profileId);
    var newCtrl = { ...controls };
    let arraySize = newCtrl.cntl.length;
    if (noOfControls > 0) {
      let ctrl = newCtrl.cntl.filter((row) => {
        return row.pageNum == page;
      });
      let size = ctrl.length;

      if (noOfControls > size) {
        // ctrl = newCtrl.cntl.filter(row => {return row.pageNum==page})
        // console.log("Page array Size " + size);
        for (let i = size; i < noOfControls; i++) {
          newCtrl.cntl.push({
            id: arraySize++,
            indexNum: i + 1,
            controlType: "Text",
            x: 0,
            y: 0,
            lable: "Name",
            value: "Name",
            gap: 10,
            fontSize: 10,
            pageNum: page,
            profileId: profileId,
          });
        }
      } else if (noOfControls < size) {
        console.log("size + " + size);
        console.log("noOfControls " + noOfControls);

        for (let i = parseInt(noOfControls) + 1; i <= size; i++) {
          // console.log("id + size" + i + (size));
          newCtrl.cntl = newCtrl.cntl.filter((row) => {
            return !(row.pageNum == page && row.indexNum == i);
          });
        }
      }
      // newCtrl.profileId = profileId;
      console.log(newCtrl);
      // newCtrl.cntl = ctrl;
      setControls(newCtrl);
    }
  };

  const setType = (type, id) => {
    var newCtrl = { ...controls };
    console.log("id " + id);
    newCtrl.cntl[id].controlType = type;
    // console.log(id);
    setControls(newCtrl);
    console.log("constrols " + controls);
  };

  const setLable = (label, id) => {
    let newCtrl = { ...controls };
    newCtrl.cntl[id].lable = label;
    setControls(newCtrl);
  };

  const setValue = (value, id) => {
    let newCntl = { ...controls };
    newCntl.cntl[id].value = value;
    console.log(id);
    setControls(newCntl);
  };

  const dislayControls = (controls) => {
    console.log("Controls ", controls);
    const returnControl = controls.cntl;

    // for (var i = 0; i < controls.cntl .length; i++) {
    //   returnControl.push(controls.cntl[i]);
    // }

    console.log("Json Object", returnControl);
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(returnControl),
    };

    // console.log("Json object : ", JSON.stringify(returnControl));

    fetch(
      "http://localhost:8080/form-writer/get-controls",
      requestOptions
    ).then((response) => console.log(response.body));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // console.log(returnControl);
  };

  const XYChange = (coardinate, type, id) => {
    // console.log("Id:",id);
    var newCntl = { ...controls };
    var x = controls.cntl[id].x;
    var y = controls.cntl[id].y;

    if (coardinate == "x") {
      if (type == "-") {
        x--;
      } else {
        x++;
      }
      newCntl.cntl[id].x = x;
    } else {
      if (type == "-") {
        y--;
      } else {
        y++;
      }
      newCntl.cntl[id].y = y;
    }

    setControls(newCntl);

    dislayControls(controls);
    handlePages(page);

    if (reloadPage) {
      setReloadPage(false);
    } else {
      setReloadPage(true);
    }
  };

  const changeGap = (type, id) => {
    var newCntl = { ...controls };
    var gap = controls.cntl[id].gap;

    if (type == "+") {
      gap++;
    } else {
      gap--;
    }
    newCntl.cntl[id].gap = gap;
    setControls(newCntl);
    dislayControls(controls);
    handlePages(page);
  };

  const changeFontSize = (type, id) => {
    var newCntl = { ...controls };
    var fontSize = controls.cntl[id].fontSize;

    if (type == "+") {
      fontSize++;
    } else {
      fontSize--;
    }
    newCntl.cntl[id].fontSize = fontSize;
    setControls(newCntl);
    handlePages(page);
    // dislayControls(controls);
  };

  const setPageNum = (pageNo) => {
    setPage(pageNo);
  };

  const visible = (profile) => {
    setProfileId(profile.profileId);
    setPdfVisible(true);
    setProfile(profile);
    setImagePath("http://localhost:8080/form-writer/get-image-url/" +profile.profileId +"/" +(page) +"/" +num
    );
  };

  const generateFormVisible = (profile) => {
    console.log(profile);
    setProfileId(profile.profileId);
    setProfile(profile);
    setGenerateVisible(true);
  };

  const saveControls = () => {
    const returnControl = controls.cntl;

    console.log(JSON.stringify(returnControl));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(returnControl),
    };

    fetch("http://localhost:8080/profile-details/add", requestOptions).then(
      (response) => console.log(response.body)
    );
  };

  const prevPage = (page) => {
    // console.log(pageNum)
    if (page > 1) {
      setPage(page - 1);
      // props.setPage(pageNum - 1);
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page - 1) +
          "/" +
          num
      );
    } else {
      console.log("else console " + page);
    }
  };

  const nextPage = (page) => {
    // console.log(props.profile);
    console.log(page);
    // console.log(props.profile.pdfPages);
    if (page < profile.pdfPages) {
      setPage(page + 1);
      console.log(page);
      // console.log("D:/Projects/form-writer/src/main/resources/assets/images/"+image.substring(0,image.length-4)+pageNum+".jpg")
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page + 1) +
          "/" +
          num
      );
    } else {
      console.log("else next " + page);
    }
  };

  const handlePages = (page) => {

    if(page==1){
     
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page + 1) +
          "/" +
          num
      );
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page) +
          "/" +
          num
      );
      
    }
    else{
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page -1) +
          "/" +
          num
      );
      setImagePath(
        "http://localhost:8080/form-writer/get-image-url/" +
          profileId +
          "/" +
          (page) +
          "/" +
          num
      );
    }
  }

  const onProfileSubmit = () => {
    setAddProfilre(true);
  };
  // console.log(page);

  return (
    <Fragment>
      {/* <span>{controls.selectedIndex}</span> */}
      {/* <span>{controls.cntl[controls.selectedIndex-1].type}</span> */}
      {!pdfVisible && !generateVisible && (
        <CreateProfileForm onProfileSubmit={onProfileSubmit} />
      )}
      {!pdfVisible && !generateVisible && (
        <ProfileList
          profiles={profiles}
          visible={visible}
          generateFormVisible={generateFormVisible}
        ></ProfileList>
      )}
      {generateVisible && (
        <div className="container">
          <GenerateForm
            object={controls}
            setValue={setValue}
            profileId={profileId}
            dislayControls={dislayControls}
          />
        </div>
      )}
      {pdfVisible && (
        <div className="control-div container">
          <Controls
            controls={controls}
            rowClickHandler={rowClickHandler}
            manageControls={manageControls}
            setType={setType}
            setLable={setLable}
            setValue={setValue}
            saveControls={saveControls}
            dislayControls={dislayControls}
            controlls={controls}
            XYChange={XYChange}
            changeGap={changeGap}
            changeFontSize={changeFontSize}
            page={page}
          ></Controls>
          <OpenPdf
            XY={setXYCordinates}
            page={page}
            // setPage={setPageNum}
            num={num}
            prevPage={prevPage}
            nextPage={nextPage}
            imagePath={imagePath}
          ></OpenPdf>
        </div>
      )}
    </Fragment>
  );
};

export default Container;
