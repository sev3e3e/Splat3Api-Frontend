const a = async () => {
    return (
        <>
            {(
                await fetch("http://localhost:3000/api/getDates", {
                    cache: "force-cache",
                })
            ).json()}
        </>
    );
};

export default a;
