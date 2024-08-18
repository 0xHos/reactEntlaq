import { faAdd, faEdit, faMessage, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { PageOptionDropdown, SectionOptionDropdown } from "../data";
import { useContext, useState } from "react";
import { AdminContext } from "../../../context/adminContext";




 function NavItem(props){
  
      const [isOpen,setIsOpen] = useState(false)
      const adminContext = useContext(AdminContext);


  
      const handelOpen = (event)=>{
          setIsOpen(!isOpen);
          adminContext?.setPageAndSection((prev)=>({...prev,[event.target.name]:event.target.value}))
      }

  
      return(
          <>
              <div>
                  {/* title */}
                  <div className="m-4">
                      <button className="font-extrabold" name="page" value={props.pageValue} onClick={handelOpen}>{props.page} </button>
                  </div>
                  {/* content */}
                  {
                        isOpen && (
                          <div className="flex flex-col items-start pl-4 ">
                            {props.sections.map((sec, index:number) => (
                                <>
                                    <Link to={`view/${props.pageValue}/${sec.value}`}  className="font-medium text-customColor-green my-1 p-2" key={index}>{sec.show_name}</Link>                            
                                </>
                            ))}
                             {props.pageValue == 'home'?<Link to={`view/home/about_us`}  className="font-medium text-customColor-green my-1 p-2" >About US</Link>:null}
                             {props.pageValue == 'home'?<Link to={`view/home/our_services_link`}  className="font-medium text-customColor-green my-1 p-2" >Entlaq Advisory Link</Link>:null}
                             {props.pageValue == 'home'?<Link to={`view/home/our_services_link_2`}  className="font-medium text-customColor-green my-1 p-2" >Our Services Entlaq Programs Link</Link>:null}
                             {props.pageValue == 'home'?<Link to={`view/home/partner_text`}  className="font-medium text-customColor-green my-1 p-2" >Entlaq Partners Overview</Link>:null}



                          </div>
                        )
                  }
              </div>
          </>
      );
  }


export default function SideNav(){
    
    const navigate = useNavigate();


    const signOut = ()=>{
        sessionStorage.removeItem("token");
        navigate("/admin");
    }

    

     return(
        <>
        {/* Logo and title */}
           <aside className="flex flex-col text-customColor-blue  h-full">
                <div className="space-y-4 my-16 flex flex-col items-center">
                        <a href="/"><img src='/img/logo.svg' className="h-10" alt="Logo"/></a>
                        <p className="font-extrabold text-1xl text-center">Dashboard</p>
                        <button onClick={signOut}>
                            <FontAwesomeIcon icon={faSignOut}/>
                        </button>
                </div>

                {/* buttons to make actions  */}
                <div className="w-full flex justify-center space-x-4">
                    <Link className="" to="messages"><FontAwesomeIcon title="Messages" icon={faMessage}/></Link>
                    <Link className="" to="add_in_section"><FontAwesomeIcon  icon={faAdd}/></Link>
                    <Link className="" to="add_in_gallery"><FontAwesomeIcon title="Gallery" icon={faImage}/></Link>
                    <Link className="" to="add_report"><FontAwesomeIcon title="Report" icon={faEdit}/></Link>  

                </div>
                <hr className="my-6 mx-3"/>
                
                <div id="root-menu" className="  w-full overflow-y-auto ">
                    <div id="menu" className="text-blue-900  p-6 basis-3/4 md:basis-1/4 flex flex-col ">
                        {
                            PageOptionDropdown.map((page,index)=>{
                                return <NavItem key={index} pageValue={page.value} page={page.show_name== "-"?"":page.show_name} sections = {SectionOptionDropdown[page.value]?.map((section)=>{
                                    return(section.show_name == "-"?"":section)
                                })}/>
                            })
                        }
                    </div>
                </div>


            </aside>
        </>
    );
}


