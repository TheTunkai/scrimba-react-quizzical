export default function Start(props) {
    return (
        <div
            className="p-60 bg-gradient-to-tr from-indigo-50 via-white to-fuchsia-50 bg-opacity-30 rounded-md grid grid-rows-3 gap-y-5">
            <h2 className="text-5xl font-semibold mx-auto">
                Quizzical
            </h2>
            <p className="mx-auto font-medium text-lg">Find out your trivia knowledge</p>
            <button
                className="mx-auto text-lg font-semibold bg-indigo-800 rounded-xl hover:bg-indigo-600 transition duration-75 text-white w-2/3"
                onClick={props.handleGameStart}>Start
                Quiz!
            </button>
        </div>
    )
}