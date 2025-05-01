(function(Scratch) {
  'use strict';

  let socket = null;
  let currentRoom = "";
  let currentUsername = "";
  const blockIconURI = 
  "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzUuNDA5NzciIGhlaWdodD0iMTM1LjQwOTc3IiB2aWV3Qm94PSIwLDAsMTM1LjQwOTc3LDEzNS40MDk3NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4yOTUxMiwtMTEyLjI5NTEyKSI+PGcgc3Ryb2tlPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xNzIuMjk1MTIsMjQ3LjcwNDg4di0xMzUuNDA5NzdoMTM1LjQwOTc3djEzNS40MDk3N3oiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxnIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTI1Ni4wOTU3MSwxNTkuNzUwNDFjLTAuMDQsMC4xNyAtMC4wNywwLjM0IC0wLjEyLDAuNTFjLTAuMTUsMC42MyAtMC40NiwyLjEyIC0wLjc3LDUuMDNjMCwwLjA1IDAsMC4wOSAtMC4wMSwwLjEyYzEuNzEsNi44OCAtMS4xNywxMS4wNyAtMy4wOCwxMi45OGMtMC4xMiwwLjEzIC0wLjI1LDAuMjUgLTAuMzksMC4zN2MtMS44NywxLjcgLTcuNDcsMjMuMTQgLTcuNDcsMjYuOTVjMCw1LjY2IC0zLjI2LDEwLjU4IC04LjUxLDEyLjgzYy0wLjEzLDAuMDYgLTAuMjcsMC4xMiAtMC40LDAuMTdjLTEuNzYsMC42NyAtMy43NCwxIC02LjA2LDFjLTAuODQsMCAtMS43NCwtMC4wNCAtMi43MiwtMC4xM2MtMC42LC0wLjAzIC0xLjQ4LC0wLjAyIC0yLjUyLDAuMDFjLTEuODksMC4yMSAtNC41NSwwLjQyIC04LjExLDAuNjJjLTAuMDcsMCAtMC4xNCwwLjAxIC0wLjIyLDAuMDFjLTAuNDcsMC4wMiAtMC45MiwwLjAzIC0xLjM2LDAuMDNjLTYuMzcsMCAtMTEuMDIsLTIuMDIgLTEzLjgzLC01Ljk5Yy0wLjA2LC0wLjA4IC0wLjExLC0wLjE2IC0wLjE2LC0wLjI0Yy0yLjg2LC00LjI3IC0yLjk0LC05LjY3IC0wLjIyLC0xNC4wOGMwLjAyLC0wLjA1IDAuMDUsLTAuMDkgMC4wOCwtMC4xNGMxLjczLC0yLjcyIDQuMjYsLTQuNjYgNy41NCwtNS44YzAuMDQsLTEuOTMgMC4wMywtNC4zNSAtMC4wMywtNy4yMmMtMS42MywwLjY4IC0zLjUxLDEuMDggLTUuNjIsMS4wOGMtNS41NywwIC0xMC4xNywtMy4zMSAtMTEuNzcsLTguMzRjLTAuMzMsLTEuMDIgLTAuNjQsLTIuNTEgLTEuMzYsLTUuODdjLTAuMDMsLTAuMTIgLTAuMDUsLTAuMjQgLTAuMDcsLTAuMzZsLTEuNDgsLTguMjdjLTAuMDUsLTAuMTggLTAuMTIsLTAuMzkgLTAuMiwtMC42M2MtMC43NywtMi4xOSAtMS4xMywtNC4wNSAtMS4xMywtNS44NWMwLC0yLjIzIDAuNjUsLTUuNiAzLjczLC04Ljk2YzEuNTUsLTEuNyA0LjM3LC0zLjkgOC45MSwtNC42MWMwLjU2LC0wLjA5IDEuMTMsLTAuMTQgMS43LC0wLjE0aDExLjA2YzAuMjUsMCAwLjUsMC4wMSAwLjc1LDAuMDNjNC4yMiwwLjE1IDgsMC4xNCAxMS4yNCwtMC4wMWM0LjUzLC0wLjIgOS4wNSwtMC41OSAxMy40OCwtMS4xNmMwLjUsLTAuMTYgMS4wNCwtMC4zMiAxLjYyLC0wLjQ2YzAuNTUsLTAuMTQgMS4xMSwtMC4yMyAxLjY3LC0wLjI5YzQuMjYsLTAuMzkgOC4yMywwLjg0IDExLjMyLDMuNDhjMy44MywzLjI5IDUuNTIsOC4yNyA0LjUxLDEzLjMzeiIgZmlsbD0iI2VlNDc0NyIvPjxwYXRoIGQ9Ik0yOTIuODU1NDQsMTk4LjQ2MTA1Yy0zLjIzLDguOTUgLTEyLjAxLDE0LjM5IC0yNi4wOSwxNi4xN2MtMC42NCwwLjA4IC0xLjI3LDAuMTMgLTEuOSwwLjE1Yy0wLjgyLDEuMiAtMS44OSwyLjI0IC0zLjE1LDMuMDVjLTMuMywyLjExIC02LjM5LDMuMTQgLTkuNDQsMy4xNGMtNi4yNywwIC0xMy4wMiwtNC42OCAtMTMuMDIsLTE0Ljk2YzAsLTAuNyAwLjAzLC0xLjYxIDAuMSwtMi44N2MwLjAzLC0wLjU0IDAuMDYsLTAuOTYgMC4wNywtMS4yN2MtMC4xNywtMC43OCAtMC4yNiwtMS41NyAtMC4yNiwtMi4zN3YtNC44NGMwLC0wLjc5IDAuMDgsLTEuNTggMC4yNCwtMi4zN2MwLjAxLC0wLjY3IDAuMDQsLTEuNDIgMC4wOSwtMi4yNGMtMC4yNCwtMC44OCAtMC40MiwtMS45IC0wLjQyLC0zLjA0YzAsLTAuNTIgMC4wNCwtMS4wNCAwLjExLC0xLjU1YzAuMzgsLTIuNjggMS41NywtNS4zNyAzLjU4LC03LjUyYy0wLjY5LC0xLjkzIC0xLjA1LC0zLjk3IC0xLjA1LC02LjA2di01LjFjMCwtMi4wNyAwLjQxLC00LjY1IDIuNDIsLTExLjA3YzAuODQsLTIuNzYgMS4xMSwtMy42MiAxLjQ4LC00LjQyYzEuOTcsLTQuNDIgNC45NCwtNi42MyA3LjEsLTcuNzJjMy41MywtMS43NiA3LjMyLC0yLjY2IDExLjI2LC0yLjY2YzEuODIsMCAzLjU2LDAuMTkgNS4yMiwwLjU1YzAuNzQsLTAuNSAxLjUzLC0wLjkyIDIuMzcsLTEuMjdjMS4wNywtMC40NiAyLjIxLC0wLjc4IDMuNDcsLTAuOThjMy4xNSwtMC41NCA2LjQ4LDAuMTMgOS4zOCwxLjg5YzMuMDUsMS44NiA2LjU1LDUuNzIgNi4xMiwxMy42NmMtMC4wNywxLjQgLTAuMTksMy4yNyAtMC4zNyw1LjcxYy0wLjAxLDAuMDYgLTAuMDEsMC4xMiAtMC4wMiwwLjE4Yy0wLjE2LDEuNzcgLTAuMzksNC40MSAtMC43LDcuOWMwLjA4LDEuMzUgMC4wNSwyLjg2IC0wLjA3LDQuNjRjLTAuMDUsMC42OCAtMC4xNiwxLjM2IC0wLjM0LDIuMDJjLTAuMDQsMC4xNSAtMC4wOCwwLjI5IC0wLjEyLDAuNDJjMS4zNSwxLjczIDIuMjcsMy40NiAyLjksNC45NmMwLjU5LDEuMTkgMS4wOSwyLjU2IDEuNTMsNC4yM2MwLjE3LDAuNjMgMC4yOCwxLjI3IDAuMzMsMS45MmMwLjQ1LDUuNjEgMC4yMiw4LjkyIC0wLjgyLDExLjcyeiIgZmlsbD0iI2VlNDc0NyIvPjxwYXRoIGQ9Ik0yODMuMTIwODcsMTg4LjU5NmMwLjI5MywzLjYzNyAwLjIzMyw1Ljk4MSAtMC4xNzYsNy4wMzdjLTEuNzAyLDQuODA5IC03LjQyLDcuODI4IC0xNy4xNTIsOS4wNmMtMy4yODUsMC40MTEgLTYuNTY4LC0xLjE0MyAtOS44NTMsLTQuNjYyYzAsMC41MjggMC4xMTcsMi4xMTEgMC4zNTMsNC43NTFjMC4xNzYsMS45MzUgMC4xNDYsMy41MTggLTAuMDg4LDQuNzQ5Yy0xLjQ2NywwLjkzOCAtMi42MzksMS40MDggLTMuNTE5LDEuNDA4Yy0xLjM1LDAgLTIuMDIzLC0xLjMxOSAtMi4wMjMsLTMuOTU5YzAsLTAuNDY5IDAuMDI5LC0xLjIxNiAwLjA4OCwtMi4yNDJjMC4wNTgsLTEuMDI1IDAuMDg4LC0xLjc0NCAwLjA4OCwtMi4xNTVjMCwtMC45OTcgLTAuMDg4LC0xLjcgLTAuMjY0LC0yLjExMXYtNC44MzhjMCwtMC4xMTcgMC4wMjksLTAuMjQ5IDAuMDg4LC0wLjM5NmMwLjA1OCwtMC4xNDYgMC4xMTcsLTAuMjc4IDAuMTc2LC0wLjM5NmMtMC4wNTksLTAuODIgLTAuMDMsLTIuMDgxIDAuMDg4LC0zLjc4MmMwLjExNywtMS4wNTYgMC4xMTcsLTEuNzI5IDAsLTIuMDIzYy0wLjI5NCwtMC41ODUgLTAuNDM5LC0wLjkzNyAtMC40MzksLTEuMDU1YzAuMjMzLC0xLjY0MiAxLjQzNywtMi40NjMgMy42MDYsLTIuNDYzYzEuNDA3LDAgMi4yNTcsMC40OTkgMi41NTEsMS40OTVjMCwwLjkzOCAwLjExNywyLjMxNyAwLjM1Miw0LjEzNGMwLjM1MywyLjExMSAxLjQ2Niw0LjIyMyAzLjM0Myw2LjMzM2MyLjA1MiwyLjQwNSA0LjAxNiwzLjUxOSA1Ljg5NCwzLjM0M2MyLjExMSwtMC4yMzMgNC4yMjIsLTAuNzMyIDYuMzMzLC0xLjQ5NWMyLjkzMiwtMS4wNTYgNC42OTEsLTIuMjg3IDUuMjc4LC0zLjY5NGMwLjQwOSwtMS4wNTYgMC42MTUsLTIuMTY5IDAuNjE1LC0zLjM0M2MwLC0zLjU3NiAtMS4zMTksLTYuMjQ1IC0zLjk1OCwtOC4wMDRjLTEuMTc0LC0wLjc2MiAtMy4zNDMsLTEuMzc4IC02LjUxLC0xLjg0OGMtMS44MTgsLTAuMjMzIC0yLjkzMywtMC4zNTIgLTMuMzQyLC0wLjM1MmMtMi44MTUsMC4wNTkgLTUuNDQsLTAuODUgLTcuODczLC0yLjcyN2MtMi40MzQsLTEuODc2IC0zLjY1LC00LjA0NyAtMy42NSwtNi41MXYtNS4xMDFjMCwtMS4xMTMgMC42NDUsLTMuNzIzIDEuOTM2LC03LjgyOGMwLjU4NSwtMS45MzYgMC45MDgsLTIuOTYxIDAuOTY4LC0zLjA3OWMwLjUyNywtMS4yMzEgMS4yMDEsLTIuMDUyIDIuMDIyLC0yLjQ2M2MxLjk5MywtMC45OTYgNC4xMDQsLTEuNDk1IDYuMzMzLC0xLjQ5NWM0LjMzOSwwIDcuNTM1LDEuNzU5IDkuNTg4LDUuMjc3YzAuMTc2LDAuMTc2IDAuNDY5LDAuNDQgMC44OCwwLjc5MmMwLjA1OCwtMC44MiAwLjE3NiwtMi4wODEgMC4zNTIsLTMuNzgyYy0wLjA1OSwtMC43NjIgLTAuMTE4LC0xLjQ5NSAtMC4xNzYsLTIuMTk5YzAsLTAuODIgMC40MDksLTEuMzc3IDEuMjMxLC0xLjY3MWMwLjIzNCwtMC4xMTcgMC41NTcsLTAuMjA1IDAuOTY4LC0wLjI2NGMwLjU4NiwtMC4xMTcgMS4yMTcsMC4wMyAxLjg5MiwwLjQzOWMwLjY3MywwLjQxMSAwLjk1MiwxLjY0MyAwLjgzNSwzLjY5NGMtMC4wNTksMS4yOSAtMC4xNzYsMy4xMDggLTAuMzUyLDUuNDUzYy0wLjE3NiwxLjkzNiAtMC40MzksNC44OTcgLTAuNzkyLDguODg1YzAuMTE3LDAuOTM4IDAuMTE3LDIuMjI5IDAsMy44N2MtMC4yOTQsMS4xMTQgLTEuMTc0LDEuNjcxIC0yLjYzOSwxLjY3MWMtMC43NjMsMCAtMS40OTUsLTAuMjA1IC0yLjE5OSwtMC42MTVjLTAuMzUyLC0xLjExMyAtMC41MjcsLTEuNTg0IC0wLjUyNywtMS40MDhjMC4xMTYsLTEuNTgzIC0wLjIwNiwtMy42OTQgLTAuOTY4LC02LjMzM2MtMC42NDYsLTEuMzQ4IC0xLjUzOSwtMy4yNjggLTIuNjgzLC01Ljc2MWMtMS4xNDQsLTIuNDkyIC0yLjY1NCwtMy44MjcgLTQuNTMsLTQuMDAzYy0yLjM0NiwtMC4xNzYgLTMuODcsMC42MTYgLTQuNTc0LDIuMzc1Yy0wLjIzNCwwLjc2MyAtMC41NTgsMS44NzggLTAuOTY3LDMuMzQzYy0wLjcwNCwyLjE3IC0xLjE0NCw0LjI1MiAtMS4zMiw2LjI0NWMtMC4wNTksMC42NDYgLTAuMTE4LDAuOTEgLTAuMTc2LDAuNzkyYzAuMTc2LDEuMTc0IDAuMzgxLDIuMzQ2IDAuNjE2LDMuNTE5YzAuMjkzLDEuNDY2IDEuMDEyLDIuNTgxIDIuMTU1LDMuMzQyYzEuMTQ0LDAuNzYzIDMuMzI3LDEuMjMxIDYuNTUzLDEuNDA3YzcuOTE2LDAuNDcxIDEyLjgxMiwzLjIyNyAxNC42ODksOC4yNjljMC4yOTIsMC40NyAwLjU4NSwxLjI2MSAwLjg3OSwyLjM3NHoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjQ1LjQ0NjI4LDE1OC4yODUwMmMtMC40MSwxLjY0MyAtMC43NjIsMy44NyAtMS4wNTUsNi42ODVjLTAuMTE5LDEuNDA4IC0wLjA2MSwyLjU1MSAwLjE3NiwzLjQzMWMwLjQwOCwxLjQ2NyAwLjM4MSwyLjQzNSAtMC4wODgsMi45MDNjLTAuNjQ2LDAuNTg2IC0xLjUyNSwwLjg3OSAtMi42MzksMC44NzljLTEuMjkxLDAgLTIuMTQzLC0wLjM4MyAtMi41NTEsLTEuMTUxYy0wLjA2MSwtMi4zNjIgLTAuMDMxLC00LjU3OCAwLjA4OCwtNi42NDZjMC4xMTUsLTIuNTQgMC4xNzYsLTMuODY5IDAuMTc2LC0zLjk4N2MtMC4wNjEsMCAtMC4xNDgsLTAuMDU5IC0wLjI2NCwtMC4xNzhjLTUuNDU1LDAuMjM3IC0xMC41ODYsMC41ODkgLTE1LjM5NCwxLjA1OWMtMC4xMTgsMC41ODkgLTAuMTE4LDEuNTI4IDAsMi44MmMwLjIzMywxLjgyMiAwLjM1MiwyLjg4IDAuMzUyLDMuMTcyYy0wLjIzNCwxLjgyMiAtMC4zNTIsNC41MjQgLTAuMzUyLDguMTA5YzAuMjMzLDEuNTI4IDAuMzUyLDguMDggMC4zNTIsMTkuNjU1djYuNDM1YzAsMC45OTkgMC4xNDUsMS43MDQgMC40MzYsMi4xMTVoNS40MDFjMC45ODcsLTAuMTE3IDEuNzg1LDAuMTE4IDIuMzk2LDAuNzA0YzAuNjA5LDAuNTg3IDAuOTE0LDEuMjkgMC45MTQsMi4xMWMwLDEuMjg5IC0wLjYxNSwyLjE5OSAtMS44NDcsMi43MjhjLTAuNzYzLDAuMjkyIC0yLjExMSwwLjM1MiAtNC4wNDYsMC4xNzZjLTAuOTM4LC0wLjA2IC0yLjMxNywtMC4wNiAtNC4xMzUsMGMtMS42NDIsMC4yMDQgLTQuMjgsMC40MDkgLTcuOTE2LDAuNjE1Yy0zLjE2NywwLjExNyAtNS4xMDIsLTAuMzIzIC01LjgwNiwtMS4zMTljLTAuNDcsLTAuNzAzIC0wLjQ3LC0xLjQzNyAwLC0yLjE5OWMwLjgyLC0xLjI4OSAyLjk2MSwtMS45MzUgNi40MjIsLTEuOTM1YzEuMjMxLDAgMS45OTIsLTAuMTAyIDIuMjg2LC0wLjMwN2MwLjI5MywtMC4yMDUgMC40NCwtMC42MDEgMC40NCwtMS4xODdjMCwtMC41MjYgMCwtMS4wMjMgMCwtMS40OTJjMCwtMC44NzcgMCwtMi4xNjUgMCwtMy44NjJjMC4xNzYsLTIuOTgzIDAuMTc2LC03LjQzMiAwLC0xMy4zNDNjLTAuMjM1LC04LjQ4NSAtMC4xMTgsLTE1Ljk0NSAwLjM1MiwtMjIuMzgzYy0wLjA1OSwtMC4wNTggLTAuMTQ3LC0wLjE0NiAtMC4yNjYsLTAuMjY0Yy0yLjEyMywwLjExOCAtNS41NDMsMC4wNTkgLTEwLjI2LC0wLjE3N2MtMC41MzEsMCAtMi4zMzEsMC4xMTkgLTUuMzk2LDAuMzUzYzAuNzYyLDUuMzM3IDEuMjMxLDkuMzU0IDEuNDA3LDEyLjA1MWMwLDAuMzUyIC0wLjA1OSwxLjE0NCAtMC4xNzYsMi4zNzVjLTAuMDU5LDAuODc5IC0wLjc5MiwxLjMxOSAtMi4xOTksMS4zMTljLTAuNzYzLDAgLTEuMjAyLC0wLjI2MiAtMS4zMTksLTAuNzg1Yy0wLjA1OSwtMC4xMTUgLTAuNDExLC0xLjY4NyAtMS4wNTYsLTQuNzExYy0wLjM1MiwtMS45NzcgLTAuODUxLC00Ljc2OSAtMS40OTUsLTguMzc1YzAsLTAuMjMgLTAuMjA2LC0wLjk1NyAtMC42MTUsLTIuMThjLTAuMzUsLTAuOTg5IC0wLjUyNSwtMS43NDUgLTAuNTI1LC0yLjI2OGMwLC0wLjQwNiAwLjI3NywtMC45MTcgMC44MzYsLTEuNTI2YzAuNTU3LC0wLjYxIDEuMzkzLC0xLjAwNCAyLjUwNywtMS4xNzljMC4xNzYsMCAwLjQ1MywwIDAuODM2LDBjMC4zOCwwIDAuNjg4LDAgMC45MjMsMGM2Ljk3OSwwIDEwLjAyOCwwIDkuMTQ4LDBjNC43NSwwLjE3NyA4Ljk3MiwwLjE3NyAxMi42NjYsMGM1LjI3NywtMC4yMzMgMTAuNDk1LC0wLjcwMyAxNS42NTcsLTEuNDA3YzAuMzUyLC0wLjE3NiAwLjg3OSwtMC4zNTIgMS41ODIsLTAuNTI3YzEuMjkxLC0wLjExNyAyLjM0NiwwLjE3NiAzLjE2OCwwLjg4YzAuODIsMC43MDIgMS4xMTMsMS42NDEgMC44NzksMi44MTR6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjY3LjcwNDg4MzUwMTcxMzQ6NjcuNzA0ODgzNTAxNzEzNC0tPg=="
  class WSBlocks {
    constructor() {
      this.lastMessage = "";
      this.lastSender = "";
      this._triggerMessage = false;
      this._joined = false;
      this.lastJoined = "";
      
    }

    getInfo() {
      return {
        id: 'turbosocket',
        name: 'TurboSocket',
        color1: '#FF4C4C',
        color2: '#CC3333',
        color3: '#A82828',
        blockIconURI: blockIconURI,
        blocks: [
          {
            opcode: 'connect',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('Connect to the server.'),
            image: this.image
          },
          {
            opcode: 'setRoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set room [ROOM]',
            arguments: {
              ROOM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "5"
              }
            },
            image: this.image
          },
          {
            opcode: 'setUser',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('Set username [NAME]'),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Player"
              }
            },
            image: this.image
          },
          {
            opcode: 'sendMessage',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('Send message [MESSAGE]'),
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello"
              }
            },
            image: this.image
          },
          {
            opcode: 'messageReceived',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('last received message'),
            image: this.image
          },
          {
            opcode: 'messageSender',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('last message sender'),
            image: this.image
          }
        ]
      };
    }

    connect() {
      socket = new WebSocket("wss://natounet21-lil-server.replit.app");

      socket.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "recieve") {
            this.lastMessage = data.message;
            this.lastSender = data.username;
            this._triggerMessage = true;
          } else if (data.type == "user_joined") {
            this._joined = true
            this.lastJoined = data.username
          }
        } catch (e) {
          console.error("Invalid JSON from server:", event.data);
        }
      });

      socket.addEventListener("open", () => {
        console.log("Connected to WebSocket server.");
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection closed.");
      });
    }

    setRoom(args) {
      currentRoom = args.ROOM;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "set_room", room: currentRoom }));
      }
    }

    setUser(args) {
      currentUsername = args.NAME;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "set_user", username: currentUsername, room:currentRoom }));
      }
    }

    sendMessage(args) {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: "send",
          username: currentUsername,
          room: currentRoom,
          message: args.MESSAGE
        }));
      }
    }

    messageReceived() {
      return this.lastMessage || "";
    }

    messageSender() {
      return this.lastSender || "";
    }
  }

  Scratch.extensions.register(new WSBlocks());
})(Scratch);
