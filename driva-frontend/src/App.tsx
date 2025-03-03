import './App.css'
import {MultiStepForm} from "./components/form/MultiStepForm.tsx";
import {Steps} from "./components/steps/Steps.tsx";

function App() {
    return (
        <div className='min-h-screen w-screen flex items-center justify-center'>
            <MultiStepForm steps={Steps}/>
        </div>
    )
}

export default App
