import React from 'react'
import PiesChart from "../PiesChart";


export const VistaGeneral = () => {
    return (
        <div>
            <p className="m-2"><b>VISTA GENERAL DEL GRUPO </b></p>
            <div className="bg-light mx-auto border border-2 border-primary" style={{ width: "800px", height: "500px" }}>
                <div style={{ width: "100%", height: "100%", padding: "10px 0" }}>
                    <PiesChart />
                </div>
            </div>
        </div>
    )
}

export default VistaGeneral;
