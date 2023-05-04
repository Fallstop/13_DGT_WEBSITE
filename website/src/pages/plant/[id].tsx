import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import {getLocalData, PlantData} from "@/components/plant_card";



export default function Home() {

    // Set up the router
    const router = useRouter()

    // Get the id from the url
    let { id } = router.query
    console.log(typeof id)

    // Store the plant data
    const [plantData, setPlantData] = useState<PlantData | null>(null)
    const [isLoading, setLoading] = useState(true)

    // Get the plant data, depend on the id changing
    useEffect(() => {

        // Set the loading state
        setLoading(true)

        // Get the plant data
        getLocalData(id).then((data) => {

            // Set the plant data
            setPlantData(data)

            // Set the loading state
            setLoading(false)
        })

    }, [router.query])


    return (
        <>
            <h1>Plant ID: {isLoading ? "Loading..." : plantData?.english_name}</h1>

            {/*


                    <Navbar/>  - This sticky

                    <Section>
                        <PageHeader>
                            - Plant Header
                        </PageHeader>
                    </Section>

                    <Section>
                      - Plant Intro
                    </Section>

                    <Section>
                     - Location
                    </Section>

                    - Auto Generated Sections (map loop into a AutoSection component)

                    <Section>
                        <Footer/>
                    </Section>

            */}
        </>
    );
}