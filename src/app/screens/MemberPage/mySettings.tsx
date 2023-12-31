import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";

export function MySettings() {
  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src="/auth/default_user.svg"
          alt=""
          className="mb_image"
          width={"100px"}
          height={"100px"}
        />
        <div className="media_change_box">
          <span>Rasm Yuklash</span>
          <p> Faqat JPG, JPEG, PNG rasmlarni yuklay olasiz!</p>
          <div className="up_del_box">
            <Button component="label" style={{ minWidth: "0" }}>
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
            placeholder="lucas"
            name="mb_nick"
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Phone</label>
          <input
            type="text"
            placeholder="+99899 321 45 56"
            name="mb_phone"
            className="spec_input mb_phone"
          />
        </div>
        <div className="short_input">
          <label className="spec_label">Adress</label>
          <input
            type="text"
            placeholder="Tashkent, Yunus Abad 4-1"
            name="mb_address"
            className="spec_input mb_address"
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Info</label>
          <textarea
            placeholder={"mavjud emas"}
            name={"description"}
            className={"spec_textarea mb_description"}
          />
        </div>
      </Box>
      <Box display="flex" justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant="contained">Saqlash</Button>
      </Box>
    </Stack>
  );
}
