import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements AfterViewInit,OnInit {
  domain: string = "meet.jit.si/"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;
  myOverwrite =
  {
    'TOOLBAR_BUTTONS': [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile',
          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
          'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
      ]
  };
  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.room = 'This%20is%20the%20name%20of%20room'; // Set your room name
    this.user = {
        name: '' // Set your username
    }
  }
  ngAfterViewInit(): void {
    this.options = {
        roomName: this.room,
        width: 1250,
        height: 600,
      
      configOverwrite: {prejoinPageEnabled: false ,logoImageUrl: 'assets/img/src/assets/img/1650998390452.jpeg' },
        interfaceConfigOverwrite:this.myOverwrite,
        
        parentNode: document.querySelector('#jitsi-iframe'),
        userInfo: {
            displayName: this.user.name
        }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

     // Event handlers
    this.api.addEventListeners({
        readyToClose: this.handleClose,
        participantLeft: this.handleParticipantLeft,
        participantJoined: this.handleParticipantJoined,
        videoConferenceJoined: this.handleVideoConferenceJoined,
        videoConferenceLeft: this.handleVideoConferenceLeft,
        audioMuteStatusChanged: this.handleMuteStatus,
        videoMuteStatusChanged: this.handleVideoStatus
    });
}
handleClose = () => {
  console.log("handleClose");
}

handleParticipantLeft = async (participant:any) => {
  console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
  const data = await this.getParticipants();
}

handleParticipantJoined = async (participant:any) => {
  console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
  const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant:any) => {
  console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
  const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
  console.log("handleVideoConferenceLeft");
  this.router.navigate(['/thank-you']);
}

handleMuteStatus = (audio:any) => {
  console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video:any) => {
  console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(this.api.getParticipantsInfo()); // get all participants
      }, 500)
      console.log("this is the resolving point", this.api.getParticipantsInfo())
  });
}
executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}

}
