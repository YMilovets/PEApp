import translate from '../i18n';

export default function NotFoundPage() {
  return (
    <p className="mx-4">
      {translate('NotificationText', '0x003') as string}
    </p>
  );
}
