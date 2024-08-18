import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MessageDetails = ({message , handelClose}) => {


    return (
        <div className="fixed top-0 left-0 h-screen w-screen bg-custom-opicty-blue">
                <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg relative top-[10%] w-[70%] h-[70%] overflow-y-scroll">
                    <div className="sticky -top-4  bg-white py-5 ">
                        <div className="mb-2">
                            <strong>Name:</strong> {message.name}
                        </div>
                        <div className="mb-2">
                            <strong>Email:</strong> {message.email}
                        </div>
                        <div className="mb-2">
                            <strong>Subject:</strong> {message.subject}
                        </div>
                    </div>
                    <div className="mb-2">
                        <strong>Message:<br/></strong> <p className="p-2">{message.message}</p>
                    </div>
            </div>
            <FontAwesomeIcon onClick={handelClose} className="bg-red-800 text-white p-5 absolute top-[10%] right-10"icon={faClose}/>
        </div>
    );
};

export default MessageDetails;
