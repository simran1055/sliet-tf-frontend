import React, { useState, useEffect } from 'react'
import { API, BASE_API } from '../backend'
import { getDomain } from '../superAdmin/helper/domainApiCalls';
import Base from './Base'
import ImageHelper from './helper/ImageHelper';
function Domain({ match }) {

    const [domain, setDomain] = useState(null);
    const [error, seterror] = useState(false);

    const loadDomain = () => {
        getDomain(match.params.domainId).then(data => {
            if (data.error) {
                seterror(data.error);
            } else {
                setDomain(data);
            }
        });
    };

    useEffect(() => {
        loadDomain();
    }, []);



    return (
        <Base title="Domain">

            <pre>
                {
                    JSON.stringify(domain, null, 2)
                }
            </pre>

            <img src={`${BASE_API}${domain?.photo}`} alt="" />
            {/* <ImageHelper product={domain} /> */}
            {/* .split('/').pop() */}
        </Base>
    )
}

export default Domain
