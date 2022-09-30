import S from "@sanity/desk-tool/structure-builder";
import {
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineFilter,
  HiOutlineNewspaper
} from "react-icons/hi";

// import PagePreview from "./previews/PagePreview";
// import BlogPreview from "./previews/BlogPreview";

// import DocumentsPane from "sanity-plugin-documents-pane";

const hiddenDocTypes = listItem =>
  !["siteconfig", "menu"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content Manager")
    .items([
      S.listItem()
        .title("Site Config")
        .icon(HiOutlineCog)
        .child(
          S.editor().schemaType("siteconfig").documentId("siteconfig")
        ),
      S.listItem()
        .title("Menu")
        .icon(HiOutlineCog)
        .child(S.editor().schemaType("menu").documentId("menu")),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
