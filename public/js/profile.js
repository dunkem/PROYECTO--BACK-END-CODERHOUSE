// @ts-ignore
const serverSocket = io();

const imageUploadInput = document.getElementById("image-upload");
if (imageUploadInput instanceof HTMLInputElement) {
  imageUploadInput.addEventListener("change", async (event) => {
    // @ts-ignore
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("photo", file);
    console.log(formData);
    const uid = imageUploadInput.className;

    try {
      const { status } = await fetch(`/api/users/profile/${uid}`, {
        method: "POST",
        body: formData,
      });

      if (status === 201) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `New Photo added`,
          icon: "success",
          background: "#bd9cfa",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
      } else {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `New Photo Failed`,
          icon: "error",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  });
}

serverSocket.on("imageUploaded", (path) => {
  console.log(path);
  const profileImage = document.getElementById("profile-image");
  if (profileImage instanceof HTMLImageElement) {
    profileImage.src = path;
  }
});
