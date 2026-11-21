const overlay = document.getElementById("viewerOverlay");
const title = document.getElementById("viewerTitle");
const modelViewer = document.getElementById("boneModel");
const message = document.getElementById("modelMessage");
const expectedFile = document.getElementById("expectedFile");
const closeButton = document.getElementById("closeViewer");

const bones = {
  spine: {
    title: "Spine",
    file: "models/spine.glb"
  },
  pelvis: {
    title: "Pelvis",
    file: "models/pelvis.glb"
  },
  rightFemur: {
    title: "Femur",
    file: "models/right-femur.glb"
  },
  leftLowerLeg: {
    title: "Tibia & Fibula",
    file: "models/left-tibia-fibula.glb"
  }
};

let lastFocusedElement = null;

function openViewer(boneKey) {
  const bone = bones[boneKey];
  if (!bone) return;

  lastFocusedElement = document.activeElement;
  title.textContent = bone.title;
  expectedFile.textContent = bone.file;
  message.hidden = false;

  // Set the model path. If the GLB has not been added yet, the guidance stays visible.
  modelViewer.removeAttribute("src");
  modelViewer.src = bone.file;
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeViewer() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  modelViewer.removeAttribute("src");
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".bone-marker").forEach((button) => {
  button.addEventListener("click", () => openViewer(button.dataset.bone));
});

closeButton.addEventListener("click", closeViewer);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeViewer();
});

modelViewer.addEventListener("load", () => {
  message.hidden = true;
});
modelViewer.addEventListener("error", () => {
  message.hidden = false;
});
