import React, { useCallback, useState } from "react";
import { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import CommunityApiService from "../../apiServices/communityApiService";
import { BoArticlesInput } from "../../../types/boArticles";
import { serverApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import Definer from "../../../lib/Definer";
import { useHistory } from "react-router-dom";

export const TuiEditor = (props: any) => {
  /*   INITIALIZATIONS      */
  const editorRef = useRef();
  const [communityArtData, setCommunityArtData] = useState<BoArticlesInput>({
    art_subject: "",
    bo_id: "",
    art_content: "",
    art_image: "",
  });
  const history = useHistory();

  /*     HNADLERS      */
  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);

      communityArtData.art_image = image_name;
      setCommunityArtData({ ...communityArtData });
      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`ERROR:::uploadImage", ${err}`);
    }
  };

  const changeCategoryHandler = (e: any) => {
    communityArtData.bo_id = e.target.value;
    setCommunityArtData({ ...communityArtData });
  };

  const changeTitleHandler = useCallback(
    (e: any) => {
      communityArtData.art_subject = e.target.value;
      setCommunityArtData({ ...communityArtData });
    },
    [communityArtData.art_subject]
  );

  const handleRegBtn = async () => {
    try {
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();
      communityArtData.art_content = art_content;
      assert.ok(
        communityArtData.art_content !== "" &&
          communityArtData.bo_id !== "" &&
          communityArtData.art_subject !== "",
        Definer.input_err1
      );

      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArtData);
      await sweetTopSmallSuccessAlert("Artcile is created Successfully");
      props.setArticlesRebuild(new Date());

      props.setValue("1");
      // history.push("/member-page"); // vazifa yakunlangandan kn qaysi pageda bo'lishini taminlab beradi
    } catch (err) {
      console.log(`ERROR:::handleRegBtn", ${err}`);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px", justifyContent: "space-evenly" }}
      >
        <Box className="form_row">
          <Typography
            variant="h3"
            style={{ color: "rgb(255, 255, 233)", margin: "10px" }}
          >
            Category
          </Typography>
          <FormControl sx={{ width: "300px", background: "#fff" }}>
            <Select
              value={communityArtData.bo_id}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              onChange={changeCategoryHandler}
            >
              <MenuItem value="">
                <span>Choise category </span>
              </MenuItem>
              <MenuItem value="celebrity">Mashhurlar</MenuItem>
              <MenuItem value="evaluation">Restaurant</MenuItem>
              <MenuItem value="story">Mening Hikoyam</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            variant="h3"
            style={{ color: "rgb(255, 255, 233)", margin: "10px" }}
          >
            mavzu
          </Typography>
          <TextField
            id="filled-basic"
            label="Mavzu"
            variant="filled"
            style={{ width: "300px", background: "#fff" }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        ref={editorRef}
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialValue="Type here"
        initialEditType="WYSIWYG"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageUrl = await uploadImage(image);
            callback(uploadImageUrl);

            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
          onClick={handleRegBtn}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
