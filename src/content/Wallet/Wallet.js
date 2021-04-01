import React, { useState, useEffect } from 'react';

import DashHeader from '../../components/DashHeader';
import { DashCard } from '../../components/Card';

import { getStoredTokens } from '../../services/wallet.service';
import { getToken } from '../../services/auth.service';
import { Accordion, AccordionItem, Button } from 'carbon-components-react';


const Wallet = () => {
    const [googleToken, setGoogleToken] = useState()
    const [twitterToken, setTwitterToken] = useState();

    const AUTH_KEY = getToken()

    useEffect(() => {
        getStoredTokens(AUTH_KEY, 'google')
            .then(response => {
                console.log('google', response.data)
                setGoogleToken(response.data);
            });

        getStoredTokens(AUTH_KEY, 'twitter')
            .then(response => {
                console.log('twitter', response.data)
                setTwitterToken(response.data);
            });
    }, [AUTH_KEY]);

    return (
        <div className="bx--grid">
            <div className="bx--row">
                <DashHeader
                    title="Your"
                    subtitle="Wallet"
                    description="Save your tokens for rainy days"
                    className="bx--col"
                />
            </div>
            <div className="bx--row">
                <div className="bx--col-lg">
                    <DashCard>
                        <h4>Providers</h4>
                        <br />
                        <Accordion size="xl">
                            <AccordionItem title="Google">
                                <p>Store your Google token which will be used for authentication on your behalf in the event
                                    of an internet shutdown.</p>
                                <br />
                                <p>You can define how this token will be used by setting the scopes of access</p>
                                <br />
                                <Button
                                    size="sm"
                                >
                                    Store
                                </Button>
                            </AccordionItem>
                            <AccordionItem title="Twitter">
                                <p>
                                    Store your twitter token which will be used for authentication on your behalf in the event of an internet blackout.

                                </p>
                                <br />
                                <Button
                                    size="sm"
                                >
                                    Store
                                </Button>
                            </AccordionItem>

                        </Accordion>
                    </DashCard>

                </div>
                <div className="bx--col-lg">
                    <DashCard>
                        <h4>Saved tokens</h4>
                    </DashCard>
                </div>
            </div>
        </div>
    );
}

export default Wallet;