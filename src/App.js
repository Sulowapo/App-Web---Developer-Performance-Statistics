/*
    Estos 'imports' sirven para incluir bootstrap, NO son necesarios para
    utilizar las gráficas de ChartJS. Yo los utilizaré para modificar 
    rápidamente el aspecto de mi página durante los ejemplos expuestos. 
*/
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Graphics } from "./components/Graphics";

function App() {
    return (
        <Graphics/>
    );
}

export default App;