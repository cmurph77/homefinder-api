import React, { useState } from "react";
import { Slider, Divider, Button } from 'antd';
import './filter.css';

export default function Filter(props) {
    const [rentVal, setRent] = useState([0, 5000]);
    const [bedVal, setBed] = useState([0, 6]);
    const [bathVal, setBath] = useState([0, 6]);

    const onChangeCompleteRent = (value) => 
    {
        setRent(value);
    };

    const onChangeCompleteBed = (value) => 
    {
        setBed(value);
    };

    const onChangeCompleteBath = (value) => 
    {
        setBath(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onFilter(rentVal, bedVal, bathVal);
    };

    return(
        <form className="Filter" onSubmit={handleSubmit}>
            <div>
                <label> Rent Price: </label>
                <Slider className = "Range"
                    range
                    min={0}
                    max={5000}
                    step={100}
                    defaultValue={[0, 5000]}
                    onChangeComplete={onChangeCompleteRent}
                />
            </div>
            <Divider style={{ height: "auto", borderRadius: "5px", borderLeft: '2px solid white' }} type="vertical" />
            <div>
                <label> Number of Beds: </label>
                <Slider className = "Range"
                    range
                    min={0}
                    max={6}
                    step={1}
                    defaultValue={[0, 6]}
                    onChangeComplete={onChangeCompleteBed}
                />
            </div>
            <Divider style={{ height: "auto", borderRadius: "5px", borderLeft: '2px solid white' }} type="vertical" />
            <div>
                <label> Number of Baths: </label>
                <Slider className = "Range"
                    range
                    min={0}
                    max={6}
                    step={1}
                    defaultValue={[0, 6]}
                    onChangeComplete={onChangeCompleteBath}
                />
            </div>
            <Divider style={{ height: "auto", borderRadius: "5px", borderLeft: '2px solid white' }} type="vertical" />
            <Button className="SubmitButton" type="primary" size='large'>Apply Filters</Button>
        </form>
    );
}