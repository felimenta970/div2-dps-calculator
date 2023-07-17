import { useEffect, useState } from "react"

interface DamageTypes {
    DMG: number,
    BodyCHD: number,
    HeadDMG: number,
    HeadCHD: number,
}

export function Inputs() {

    const [base, setBase] = useState<number>(44191);
    const [WD, setWD] = useState<number>(2.53);
    const [TWD, setTWD] = useState<number>(1.25);
    const [CHD, setCHD] = useState<number>(1.602);
    const [HSD, setHSD] = useState<number>(1);
    const [DTOC, setDTOC] = useState<number>(1.18);
    const [DTA, setDTA] = useState<number>(1.08);
    const [DTH, setDTH] = useState<number>(1.21);
    const [AMP, setAMP] = useState<number>(1.3);
    const [AMP2, setAMP2] = useState<number>(1.15);
    const [AMP3, setAMP3] = useState<number>(1);

    const [rpm, setRPM] = useState<number>(900);

    const [DTAcalc, setDTAcalc] = useState<DamageTypes>({
        DMG: 0,
        BodyCHD: 0,
        HeadDMG: 0,
        HeadCHD: 0
    });

    const [DTA_DTOCcalc, setDTA_DTOCcalc] = useState<DamageTypes>({
        DMG: 0,
        BodyCHD: 0,
        HeadDMG: 0,
        HeadCHD: 0
    });

    const [DTHcalc, setDTHcalc] = useState<DamageTypes>({
        DMG: 0,
        BodyCHD: 0,
        HeadDMG: 0,
        HeadCHD: 0
    });

    const [DTH_DTOCcalc, setDTH_DTOCcalc] = useState<DamageTypes>({
        DMG: 0,
        BodyCHD: 0,
        HeadDMG: 0,
        HeadCHD: 0
    });

    const [dpsHeadDTA_DTOC, setDpsHeadDTA_DTOC] = useState<number>(0)
    const [dpsBodyDTA_DTOC, setDpsBodyDTA_DTOC] = useState<number>(0)

    function calculateDTA() {
        const results: DamageTypes = {
            DMG: base * WD * TWD * DTA * AMP * AMP2 * AMP3,
            BodyCHD: base * WD * TWD * (1 + CHD) * DTA * AMP * AMP2 * AMP3,
            HeadDMG: base * WD * TWD * (1 + HSD) * DTA * AMP * AMP2 * AMP3,
            HeadCHD: base * WD * TWD * (1 + HSD + CHD) * DTA * AMP * AMP2 * AMP3
        }
        setDTAcalc(results)
    }

    function calculateDTA_DTOC() {
        const results: DamageTypes = {
            DMG: base * WD * TWD * DTOC * DTA * AMP * AMP2 * AMP3,
            BodyCHD: base * WD * TWD * (1 + CHD) * DTOC * DTA * AMP * AMP2 * AMP3,
            HeadDMG: base * WD * TWD * (1 + HSD) * DTOC * DTA * DTH * AMP * AMP2 * AMP3,
            HeadCHD: base * WD * TWD * (1 + HSD + CHD) * DTOC * DTA * AMP * AMP2 * AMP3
        }
        setDTA_DTOCcalc(results)

        const DPSHead = (rpm / 60) * (results.HeadDMG * 0.4 + results.HeadCHD * 0.6);
        setDpsHeadDTA_DTOC(DPSHead)
        const DPSBody = (rpm / 60) * (results.DMG * 0.4 + results.BodyCHD * 0.6);
        setDpsBodyDTA_DTOC(DPSBody)
    }

    function calculateDTH() {
        const results: DamageTypes = {
            DMG: base * WD * TWD * DTH * AMP * AMP2 * AMP3,
            BodyCHD: base * WD * TWD * (1 + CHD) * DTH * AMP * AMP2 * AMP3,
            HeadDMG: base * WD * TWD * (1 + HSD) * DTH * AMP * AMP2 * AMP3,
            HeadCHD: base * WD * TWD * (1 + HSD + CHD) * DTH * AMP * AMP2 * AMP3
        }
        setDTHcalc(results)
    }

    function calculateDTH_DTOC() {
        const results: DamageTypes = {
            DMG: base * WD * TWD * DTOC * DTH * AMP * AMP2 * AMP3,
            BodyCHD: base * WD * TWD * (1 + CHD) * DTOC * DTH * AMP * AMP2 * AMP3,
            HeadDMG: base * WD * TWD * (1 + HSD) * DTOC * DTH * AMP * AMP2 * AMP3,
            HeadCHD: base * WD * TWD * (1 + HSD + CHD) * DTOC * DTH * AMP * AMP2 * AMP3
        }
        setDTH_DTOCcalc(results)
    }

    function calculateValues() {
        calculateDTA()
        calculateDTA_DTOC()
        calculateDTH()
        calculateDTH_DTOC()
    }

    useEffect(() => {
        calculateValues()
    }, [base, WD, TWD, DTOC, DTH, AMP, AMP2, AMP3, CHD, HSD])


    return (
        <div className="inputs-container">
            <div>
                <label>Base</label>
                <input type="number" name="Base" value={base} onChange={(e) => setBase(e.target.valueAsNumber)} placeholder="Base"/>
            </div>

            <div>
            <label>WD</label>
            <input type="number" name="WD" value={WD} onChange={(e) => setWD(e.target.valueAsNumber)} placeholder="WD"/>
            </div>

            <div>
            <label>TWD</label>
            <input type="number" name="TWD" value={TWD} onChange={(e) => setTWD(e.target.valueAsNumber)} placeholder="TWD"/>
            </div>
            
            <div>
                <label>CHD</label>
                <input type="number" name="CHD" value={CHD} onChange={(e) => setCHD(e.target.valueAsNumber)} placeholder="CHD"/>
            </div>

            <div>
                <label>HSD</label>
                <input type="number" name="HSD" value={HSD} onChange={(e) => setHSD(e.target.valueAsNumber)} placeholder="HSD"/>
            </div>
            
            <div>
                <label>DTOC</label>
                <input type="number" name="DTOC" value={DTOC} onChange={(e) => setDTOC(e.target.valueAsNumber)} placeholder="DTOC"/>
            </div>

            <div>
                <label>DTA</label>
                <input type="number" name="DTA" value={DTA} onChange={(e) => setDTA(e.target.valueAsNumber)} placeholder="DTA"/>
            </div>
            
            <div>
                <label>DTH</label>
                <input type="number" name="DTH" value={DTH} onChange={(e) => setDTH(e.target.valueAsNumber)} placeholder="DTH"/>
            </div>

            <div>
                <label>AMP1</label>
                <input type="number" name="AMP" value={AMP} onChange={(e) => setAMP(e.target.valueAsNumber)} placeholder="AMP"/>
            </div>
            

            <div>
                <label>AMP2</label>
                <input type="number" name="AMP2" value={AMP2} onChange={(e) => setAMP2(e.target.valueAsNumber)} placeholder="AMP2"/>
            </div>
            
            <div>
                <label>AMP3</label>
                <input type="number" name="AMP3" value={AMP3} onChange={(e) => setAMP3(e.target.valueAsNumber)} placeholder="AMP3"/>
            </div>

            <div>
                <label>RPM</label>
                <input type="number" name="RPM" value={rpm} onChange={(e) => setRPM(e.target.valueAsNumber)} placeholder="RPM"/>
            </div>

            <br />


            <button onClick={calculateValues}>CALCULATE</button>
            
            <br/>
            <hr/>
            <br/>

            DTA: {JSON.stringify(DTAcalc, null, 4)}
            <br/>
            DTA_DTOC: {JSON.stringify(DTA_DTOCcalc, null, 4)}
            <br/>
            DTH: {JSON.stringify(DTHcalc, null, 4)}
            <br/>
            DTH_DTOC: {JSON.stringify(DTH_DTOCcalc, null, 4)}

            <br/>

            <br/>

            <br/>
            <hr/>
            <br/>

            DPS Body: {dpsBodyDTA_DTOC}
            <br />
            DPS Head: {dpsHeadDTA_DTOC}
            
        </div>
    )
}