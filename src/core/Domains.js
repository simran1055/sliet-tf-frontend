import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { API } from '../backend'
import { getdomains } from '../superAdmin/helper/domainApiCalls';
import Base from './Base'
function Domains() {

    const [domains, setDomains] = useState([]);
    const [error, seterror] = useState(false);

    const loadAllDomains = () => {
        getdomains().then(data => {
            if (data.error) {
                seterror(data.error);
            } else {
                setDomains(data);
            }
        });
    };

    useEffect(() => {
        loadAllDomains();
    }, []);



    return (
        <Base title="Domains">

            {domains.map((domain, index) => {
                return (
                    <div key={index} className="col-4 mb-4">
                        {/* <Card product={product} /> */}
                        <Link
                            className="btn btn-success"
                            to={`/domain/${domain._id}`}
                        >
                            <span className="">View</span>
                        </Link>
                        <pre>
                            {
                                JSON.stringify(domain, null, 2)
                            }</pre>
                    </div>
                );
            })}
        </Base>
    )
}

export default Domains
