import { useState } from "react";

export  function Form() {
    const [input, setInput] = useState({ uname: "", email: "", pswd: "" });
    const [isEdit, setIsEdit] = useState(-1);
    const [isadd, setIsadd] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("data")) || []);
    const deleteRecord = (index) => {
        data.splice(index, 1);
        setData([...data]);
    };
    const [iseditall, setIseditall] = useState(false);
    const [issaved, setIssaved] = useState(false);
    const [saveddata, setSaveddata] = useState(JSON.parse(localStorage.getItem("saveddata")) || []);
    const [isvalid, setIsvalid] = useState(false);
    const [error, setError] = useState({ uname: "", pswd: "", email: "" });
    const [duplicate, setDuplicate] = useState(JSON.parse(localStorage.getItem("data")));

    const handleSubmit = () => {
        if (isEdit === -1) {
            const info = input;
            setData([...data, info]);
            setDuplicate([...data, info]);
            localStorage.setItem("data", JSON.stringify([...data, info]))
        }
        clearState();
    };

    const clearState = () => {
        setInput({ uname: "", pswd: "", email: "" });
    };

    const handleOnchange = (e) => {
        const value = e.target.value;
        setInput({ ...input, [e.target.name]: value });
    };

    const editalll = () => {
        setIseditall(true);
    };

    const inputChange = (e, index) => {
        const updt = data.map((item, idx) => {
            if (idx === index) {
                return { ...item, [e.target.name]: e.target.value };
            }
            return item;
        });
        setSaveddata(updt);
        localStorage.setItem("saveddata", JSON.stringify(saveddata));
        setData(updt);
    };

    const validation = (key, value) => {
        switch (key) {
            case "uname":
                if (!value) {
                    return ("enter username")
                }
                else {
                    return ""
                }
            case "email":
                if (!value) {
                    return ("enter email")
                }
                else {
                    return ""
                }
            case "pswd":
                if (!value) {
                    return ("enter password")
                }
                else {
                    return ""
                }
        }
    };

    const saveall = () => {
        const updated2 = saveddata.map((item) => {
            const errors = {}
            Object.keys(item).forEach((key) => {
                const err = validation(key, item[key])
                if (err) {
                    return errors[key] = err
                }
            })
            item.errors = errors;
            return item
        })
        setSaveddata(updated2);
        setData(saveddata)

        if (updated2.some(values => Object.keys(values.errors).length)) {
            return
        } else {
            localStorage.setItem("data", JSON.stringify(saveddata));
            setData(saveddata);
            setIseditall(false);
        }
    };
    return (
        <div className="App">
            <h1><u>Form</u></h1>
            <div className="form">
                <div className="row">
                    <label htmlFor="uname" className="label"><b>Username :~</b></label>
                    <input type="text" id="uname" className="input" value={input.uname} onChange={handleOnchange} name="uname" /><br />
                </div>

                <div className="row">
                    <label htmlFor="email" className="label"><b>Email :~</b></label>
                    <input type="email" id="email" name="email" value={input.email} onChange={handleOnchange} className="input" /><br />
                </div>

                <div className="row">
                    <label htmlFor="pswd" className="label"><b>Password :~</b></label>
                    <input type="password" id="pawd" className="input" name="pswd" value={input.pswd} onChange={handleOnchange} /><br />
                </div>

                <div className="row">
                    <button className="submit" onClick={handleSubmit}>INSERT</button>
                </div>
            </div>

            <div className="row">
                <h1><u>Table Record</u></h1>
                {iseditall ? (

                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td><input type="text" name="uname" onChange={(e) => inputChange(e, index)} value={item.uname} /></td>
                                    <td><input name="email" type="text" onChange={(e) => inputChange(e, index)} value={item.email} /></td>
                                    <td><input name="pswd" type="text" onChange={(e) => inputChange(e, index)} value={item.pswd} /></td>
                                    <td><button className="delete" onClick={deleteRecord}>DELETE</button></td>
                                    <td><button className="editall" onClick={editalll}>EDIT</button></td>
                                    <td><button className="save" onClick={saveall}>SAVE</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (isadd ? (<table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Button</th>
                        </tr>
                        <tr>
                            <td><input type="text" name='uname' /></td>
                            <td><input type="text" name='email' /></td>
                            <td><input type="text" name='pswd' /></td>
                        </tr>
                    </thead>

                    <tbody>
                        {[...data].map((item, index) => (
                            <tr key={index}>
                                <td>{item.uname}</td>
                                <td>{item.email}</td>
                                <td>{item.pswd}</td>
                                <td><button className="delete" onClick={deleteRecord}>DELETE</button></td>
                                <td><button className="editall" onClick={editalll}>EDIT</button></td>
                                <td><button className="save" onClick={saveall}>SAVE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>)
                    : (<table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Button</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...data].map((item, index) => (
                                <tr key={index}>
                                    <td>{item.uname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pswd}</td>
                                    <td><button className="delete" onClick={deleteRecord}>DELETE</button></td>
                                    <td><button className="editall" onClick={editalll}>EDIT</button></td>
                                    <td><button className="save" onClick={saveall}>SAVE</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>)
                )}
            </div>
        </div>
    );
}