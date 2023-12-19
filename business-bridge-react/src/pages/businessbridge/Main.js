
import EmployeeInformation from "../../components/main/EmployeeInformation";
import NoteRecipeientList from "../../components/main/MainList";
import Salesstatistics from "../../components/main/Salesstatistics";
import ElectronicPayment from "../../components/main/ElectronicPayment";


function Main(){


    return(
        <>
            <div className="main-area">
                    <EmployeeInformation/>
                <div className="main-NoteRecipeientList-area">
                    <NoteRecipeientList/>
                    <div className="main-sales-statistics-area">
                        <Salesstatistics/>
                        <div className="main-electronic-payment-area">
                            <ElectronicPayment/>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default Main;