anima fogma to code:

Gallery empty:
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="globals.css" />
    <link rel="stylesheet" href="styleguide.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="gallery-empty">
      <img class="chatgpt-image-dic" src="img/chatgpt-image-8-dic-2025-13-46-13-2.png" />
      <div class="nav">
        <div class="button"><img class="img" src="img/home.svg" /></div>
        <button class="div-wrapper"><div class="text-wrapper">􀅼</div></button>
        <div class="user-wrapper"><img class="img" src="img/user.svg" /></div>
      </div>
      <div class="icon-and-text">
        <img class="logoiso" src="img/logoiso-1.png" />
        <div class="text">
          <div class="div">Start Journaling</div>
          <p class="create-your-personal">Create your personal sea journal.<br />Tap the plus button to get started.</p>
        </div>
      </div>
      <p class="welcome-user">
        <span class="span">Welcome,<br /></span> <span class="text-wrapper-2">User</span>
      </p>
    </div>
  </body>
</html>

css:
.gallery-empty {
  position: relative;
  width: 301px;
  height: 650px;
  border-radius: 37px;
  overflow: hidden;
  border: 1px solid;
  border-color: #000000;
  background: linear-gradient(
    180deg,
    rgba(8, 55, 80, 1) 0%,
    rgba(1, 12, 42, 1) 100%
  );
}

.gallery-empty .chatgpt-image-dic {
  position: absolute;
  top: 0;
  left: 0;
  width: 301px;
  height: 646px;
  aspect-ratio: 1.5;
  object-fit: cover;
}

.gallery-empty .nav {
  display: flex;
  width: 301px;
  height: 75px;
  align-items: center;
  gap: 54px;
  padding: 0px 9px;
  position: absolute;
  top: 575px;
  left: 0;
}

.gallery-empty .button {
  width: 72px;
  height: 72px;
  border-radius: 100px;
  box-shadow: 0px 8px 24px #0000001a, 0px 20px 40px #0000001a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gallery-empty .img {
  position: relative;
  width: 18px;
  height: 18px;
}

.gallery-empty .div-wrapper {
  all: unset;
  box-sizing: border-box;
  width: 42px;
  height: 42px;
  background-color: var(--primary-medium);
  border-radius: 100px;
  box-shadow: 0px 8px 24px #0000001a, 0px 20px 40px #0000001a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gallery-empty .text-wrapper {
  position: relative;
  width: fit-content;
  font-family: var(--semibold-25pt-font-family);
  font-weight: var(--semibold-25pt-font-weight);
  color: var(--neutral-light);
  font-size: var(--semibold-25pt-font-size);
  text-align: center;
  letter-spacing: var(--semibold-25pt-letter-spacing);
  line-height: var(--semibold-25pt-line-height);
  white-space: nowrap;
  font-style: var(--semibold-25pt-font-style);
}

.gallery-empty .user-wrapper {
  width: 54px;
  height: 54px;
  border-radius: 75px;
  box-shadow: 0px 6px 18px #0000001a, 0px 15px 30px #0000001a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gallery-empty .icon-and-text {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: absolute;
  top: 230px;
  left: 33px;
}

.gallery-empty .logoiso {
  position: relative;
  width: 85.27px;
  height: 88.9px;
  aspect-ratio: 0.92;
}

.gallery-empty .text {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  position: relative;
  flex: 0 0 auto;
}

.gallery-empty .div {
  position: relative;
  width: fit-content;
  margin-top: -1.00px;
  font-family: "Barlow-Bold", Helvetica;
  font-weight: 700;
  color: #d9d9d9;
  font-size: 22px;
  text-align: center;
  letter-spacing: 0;
  line-height: 28px;
  white-space: nowrap;
}

.gallery-empty .create-your-personal {
  position: relative;
  width: fit-content;
  font-family: "Barlow-Regular", Helvetica;
  font-weight: 400;
  color: #f5fafd99;
  font-size: 15px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
}

.gallery-empty .welcome-user {
  position: absolute;
  top: 48px;
  left: 34px;
  font-family: "Barlow-Medium", Helvetica;
  font-weight: 400;
  color: var(--neutral-light);
  font-size: 24px;
  letter-spacing: 0;
  line-height: normal;
}

.gallery-empty .span {
  font-weight: 500;
}

.gallery-empty .text-wrapper-2 {
  font-family: "Barlow-Bold", Helvetica;
  font-weight: 700;
}



new post:
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="globals.css" />
    <link rel="stylesheet" href="styleguide.css" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="upload-photo">
      <img class="chatgpt-image-dic" src="img/chatgpt-image-8-dic-2025-13-46-13-2.png" />
      <div class="form">
        <button class="button-cat"><div class="home">Save</div></button>
        <button class="home-wrapper"><div class="text-wrapper">Cancel</div></button>
        <img class="swimming-green-sea" src="img/swimming-green-sea-turtle-scuba-600nw-2288980133-1.png" />
        <div class="div">Image name lorem ipsum</div>
        <div class="upload-button">
          <div class="text-wrapper-2">Upload Image</div>
          <img class="upload" src="img/upload.svg" />
        </div>
        <div class="text-wrapper-3">Suported formats: JPG, PNG</div>
        <div class="text-wrapper-4">Upload new post</div>
      </div>
    </div>
  </body>
</html>

css:
.upload-photo {
  position: relative;
  width: 301px;
  height: 650px;
  border-radius: 37px;
  overflow: hidden;
  border: 1px solid;
  border-color: #000000;
  background: linear-gradient(
    180deg,
    rgba(8, 55, 80, 1) 0%,
    rgba(1, 12, 42, 1) 100%
  );
}

.upload-photo .chatgpt-image-dic {
  position: absolute;
  top: 0;
  left: 0;
  width: 301px;
  height: 646px;
  aspect-ratio: 1.5;
  object-fit: cover;
}

.upload-photo .form {
  position: absolute;
  top: 155px;
  left: 16px;
  width: 270px;
  height: 314px;
  background-color: #f5fafd80;
  border-radius: 10px;
  overflow: hidden;
}

.upload-photo .button-cat {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 66px;
  height: 21px;
  align-items: flex-start;
  justify-content: center;
  gap: 6.35px;
  padding: 2.54px 12.69px;
  position: absolute;
  top: calc(50.00% + 113px);
  left: calc(50.00% - 78px);
  background-color: var(--primary-medium);
  border-radius: 3.81px;
  box-shadow: 0px 1.27px 2.54px #00000040;
}

.upload-photo .home {
  position: relative;
  width: 123.12px;
  height: 13.33px;
  margin-top: -0.63px;
  margin-left: -41.25px;
  margin-right: -41.25px;
  font-family: "Barlow-Medium", Helvetica;
  font-weight: 500;
  color: var(--neutral-light);
  font-size: 12.7px;
  text-align: center;
  letter-spacing: 0.63px;
  line-height: normal;
  white-space: nowrap;
}

.upload-photo .home-wrapper {
  all: unset;
  box-sizing: border-box;
  display: flex;
  width: 66px;
  height: 21px;
  align-items: flex-start;
  justify-content: center;
  gap: 6.35px;
  padding: 2.54px 12.69px;
  position: absolute;
  top: calc(50.00% + 113px);
  left: calc(50.00% + 6px);
  background-color: var(--neutral-light);
  border-radius: 3.81px;
  box-shadow: 0px 1.27px 2.54px #00000040;
}

.upload-photo .text-wrapper {
  position: relative;
  width: 123.12px;
  height: 13.33px;
  margin-top: -0.63px;
  margin-left: -41.25px;
  margin-right: -41.25px;
  font-family: "Barlow-Medium", Helvetica;
  font-weight: 500;
  color: var(--neutral-dark);
  font-size: 12.7px;
  text-align: center;
  letter-spacing: 0.63px;
  line-height: normal;
  white-space: nowrap;
}

.upload-photo .swimming-green-sea {
  position: absolute;
  top: 104px;
  left: 30px;
  width: 211px;
  height: 141px;
  aspect-ratio: 1.5;
  object-fit: cover;
}

.upload-photo .div {
  position: absolute;
  top: 79px;
  left: 82px;
  font-family: "Barlow-Regular", Helvetica;
  font-weight: 400;
  color: var(--neutral-dark);
  font-size: 10px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
}

.upload-photo .upload-button {
  display: flex;
  width: 120px;
  align-items: center;
  gap: 3.58px;
  padding: 1.79px 12.54px 1.79px 15.22px;
  position: absolute;
  top: 63px;
  left: 75px;
  background-color: var(--primary-medium);
  border-radius: 7.16px;
  overflow: hidden;
}

.upload-photo .text-wrapper-2 {
  position: relative;
  width: fit-content;
  margin-top: -0.90px;
  font-family: "Barlow-Regular", Helvetica;
  font-weight: 400;
  color: #ffffff;
  font-size: 12.4px;
  text-align: center;
  letter-spacing: 0;
  line-height: normal;
}

.upload-photo .upload {
  position: relative;
  width: 14.33px;
  height: 14.33px;
}

.upload-photo .text-wrapper-3 {
  position: absolute;
  top: 36px;
  left: 48px;
  font-family: "Barlow-Regular", Helvetica;
  font-weight: 400;
  color: var(--neutral-dark);
  font-size: 14px;
  text-align: center;
  letter-spacing: 0;
  line-height: 20px;
  white-space: nowrap;
}

.upload-photo .text-wrapper-4 {
  position: absolute;
  top: 8px;
  left: 54px;
  font-family: "Barlow-Bold", Helvetica;
  font-weight: 700;
  color: var(--neutral-dark);
  font-size: 22px;
  text-align: center;
  letter-spacing: 0;
  line-height: 28px;
  white-space: nowrap;
}
