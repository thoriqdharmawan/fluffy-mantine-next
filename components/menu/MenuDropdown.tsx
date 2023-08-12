import { Menu, MenuItemProps } from '@mantine/core';

interface MenuItemsDropdown extends MenuItemProps {
  hidden?: boolean;
}

interface MenuSections {
  label?: string;
  hidden?: boolean;
  items: MenuItemsDropdown[];
}

interface Props {
  children: React.ReactNode;
  sections: MenuSections[];
}

export default function MenuDropdown({ children, sections }: Props) {
  const totalSections = sections.filter(({ hidden }) => !hidden).length;

  return (
    <Menu position="bottom-end" shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        {sections.filter(({ hidden }) => !hidden)?.map((section, id) => {
          return (
            <div key={id}>
              {section.label && (<Menu.Label>{section.label}</Menu.Label>)}
              {section.items.filter(({ hidden }) => !hidden).map((item: MenuItemProps, id) => {
                return <Menu.Item {...item} key={id} />;
              })}
              {id + 1 !== totalSections && <Menu.Divider />}
            </div>
          );
        })}
      </Menu.Dropdown>
    </Menu>
  );
}
