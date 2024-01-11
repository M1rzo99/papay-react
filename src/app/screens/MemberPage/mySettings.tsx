import { CloudDownload, Try } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { verifyMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import assert from "assert";
import Definer from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings(props: any) {
  /* INITIALIZATIONS */
  const [file, setFile] = useState(verifyMemberData?.mb_image);

  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_address: "",
    mb_description: "",
    mb_image: "",
  });

  /*   HANDLERS */

  const changMembernickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changMemberAdressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changMemberDescriptionkHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };

  const handleImagePreviewer = (e: any) => {
    try {
      console.log("e.target.files::", e.target.files);
      const file = e.target.files[0];

      const fileType = file["type"],
        validTypes = ["image/jpg", "image/jpeg", "image/png"];
      assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR:::  handleImagePreviewer ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  const handleSubmitBtn = async () => {
    try {
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);

      assert.ok(result, Definer.general_err1);
      await sweetTopSmallSuccessAlert(
        "Information modified successfully",
        700,
        false
      );
      window.location.reload();
    } catch (err) {
      console.log(`ERROR:::  handleSubmitBtn ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src={file}
          alt=""
          className="mb_image"
          width={"100px"}
          height={"100px"}
        />
        <div className="media_change_box">
          <span>Rasm Yuklash</span>
          <p> Faqat JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
          <div className="up_del_box">
            <Button
              component="label"
              style={{ minWidth: "0" }}
              onChange={handleImagePreviewer}
            >
              <CloudDownload />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Name</label>
          <input
            type="text"
            className="spec_input mb_nick"
            placeholder={verifyMemberData?.mb_nick}
            name="mb_nick"
            onChange={changMembernickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Phone</label>
          <input
            type="text"
            placeholder={verifyMemberData?.mb_phone}
            name="mb_phone"
            className="spec_input mb_phone"
            onChange={changMemberPhoneHandler}
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Adress</label>
          <input
            type="text"
            placeholder={verifyMemberData?.mb_address ?? "Manzil kiritilmagan"}
            name="mb_address"
            className="spec_input mb_address"
            onChange={changMemberAdressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Info</label>
          <textarea
            placeholder={verifyMemberData?.mb_description ?? " Mavjud emas"}
            name={"description"}
            className={"spec_textarea mb_description"}
            onChange={changMemberDescriptionkHandler}
          />
        </div>
      </Box>
      <Box display="flex" justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant="contained" onClick={handleSubmitBtn}>
          Saqlash
        </Button>
      </Box>
    </Stack>
  );
}
