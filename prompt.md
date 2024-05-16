# Audio Recorder Prompt

### V1 
```markdown
i want to make an electron js app (windows desktop application for now) where i want to get audio output and microphone input. So for example i am in a google meet meeting i would like the electron js application to have access to my mic source of what i am saying and also access to the device speaker output of what the person in the meeting is saying. And once i have access to these source i want to record them and do an on-device speech to text using some offline/on-device version of whisper model. And then once i have a transcription of the recording using this model then i would send it to open-ai chatgpt api for summarization. whose output will be shown in the electron js app
```

### V2
```markdown
thanks this looks like a great overview for the project. Help me do things step by step and i will ask for help if needed for each step
First start by help me setup a electron js project and give me a modern UI interface using material ui or joy ui if possible and then help me get the device speaker audio and mic input source selection option. And for the first step let me record these two and hear a recording of these for debugging purposes. Give me the full code, the folder structure, the libraries to install and the different code files and their location for this step
```

I want to create an Electron.js app that captures audio output and microphone input, performs on-device speech-to-text using Whisper, and summarizes the transcription using the OpenAI ChatGPT API. Here are the steps I would like to follow:

1. Set up an Electron.js project with a modern UI interface using Material-UI.
2. Implement functionality to select the device speaker audio and microphone input sources.
3. Record the selected audio sources and provide a way to play back the recordings for debugging purposes.
4. Integrate the Whisper library to perform on-device speech-to-text on the recorded audio.
5. Send the transcription to the OpenAI ChatGPT API for summarization.
6. Display the summarized output in the Electron.js app.

For each step, please provide the necessary code changes, folder structure, libraries to install, and any additional guidance or best practices.